<?php

namespace App\Services\App\Services;

use Illuminate\Support\Facades\DB;

use Illuminate\Support\Collection;
use App\Services\App\GetService;

class TagService
{
    public static function mapTags(Collection $rawTags): Collection
    {
        return $rawTags->map(function ($tag, int $key) {
            return ['group_label' => $tag->tag_group->name, 'tag_text' => $tag->name];
        });
    }

    public static function sync(string $module, string $id, array $module_tag_ids, array $global_tag_ids, array $fields, array $onps): array
    {
        // Get item with tags and onps (if they are defined).
        $model = GetService::getModel($module, true);
        $has_module_tags = method_exists($model, 'module_tags');
        $has_global_tags = method_exists($model, 'global_tags');
        $has_onps = method_exists($model, 'onps');
        $with = [];

        if ($has_module_tags) {
            $with['module_tags'] = function ($query) {
                $query->select('id');
            };
        }

        if ($has_global_tags) {
            $with['global_tags'] = function ($query) {
                $query->select('id');
            };
        }

        if ($has_onps) {
            array_push($with, 'onps');
        }

        $item = $model->with($with)->findOrFail($id);

        // module_tags
        // -----------
        $attach_module_ids = collect([]);
        $detach_module_ids = collect([]);

        if ($has_module_tags) {
            //transform 'current' and 'new' to a standard 'Collection'
            $new_module_ids = collect($module_tag_ids);
            $current_module_ids = collect($item->module_tags->map(function (object $item, int $key) {
                return $item['id'];
            }));

            //find required changes
            $attach_module_ids = $new_module_ids->diff($current_module_ids)->values()->all();
            $detach_module_ids = $current_module_ids->diff($new_module_ids)->values()->all();
        }
        //global_tags
        //-----------
        $attach_global_ids = collect([]);
        $detach_global_ids = collect([]);
        if ($has_module_tags) {
            $new_global_ids = collect($global_tag_ids);
            $current_global_ids = collect($item->global_tags->map(function (object $item, int $key) {
                return $item['id'];
            }));

            //find required changes
            $attach_global_ids = $new_global_ids->diff($current_global_ids)->values()->all();
            $detach_global_ids = $current_global_ids->diff($new_global_ids)->values()->all();
        }
        //update field values
        //-------------------
        if (isset($fields)) {
            foreach ($fields as $col) {
                $item[$col['field_name']] = $col['val'];
            }
        }

        // ONPS
        //-----
        $attach_onps = collect([]);
        $detach_onp_ids = collect([]);
        $update_onps = collect([]);

        if ($has_onps) {
            $new_onps = collect($onps);
            // get sync ids
            $new_onp_ids = $new_onps->map(function (array $item) {
                return $item['id'];
            });

            // format current
            $current_onps = $item->onps
                ->map(function (object $wp) {
                    return ['id' => $wp['id'], 'value' => $wp['pivot']['value']];
                });

            // get current ids
            $current_ids = $current_onps->map(function (array $item) {
                return $item['id'];
            });

            // extract attach/detach ids
            $attach_ids = $new_onp_ids->diff($current_ids)->values()->all();
            $detach_onp_ids = collect($current_ids)->diff($new_onp_ids)->values()->all();

            // format attach array
            $attach_onps = collect($attach_ids)->map(function (int $id) use ($new_onps) {
                $item = $new_onps->first(function (array $value) use ($id) {
                    return $value['id'] === $id;
                });
                return $item;
            });

            // get/format onps that require value update
            $update_onps = $new_onps->filter(function (array $syn) use ($current_onps) {
                $item = $current_onps->first(function (array $curr) use ($syn) {
                    return $syn['id'] === $curr['id'];
                });
                return $item && $item['value'] !== $syn['val'];
            });
        }
        //save changes
        //------------
        DB::transaction(function () use ($item, $has_module_tags, $has_global_tags, $has_onps, $detach_module_ids, $attach_module_ids, $attach_global_ids, $detach_global_ids, $detach_onp_ids, $attach_onps, $update_onps) {
            $item->save();
            if ($has_module_tags) {
                $item->module_tags()->detach($detach_module_ids);
                $item->module_tags()->attach($attach_module_ids);
            }
            if ($has_global_tags) {
                $item->global_tags()->detach($detach_global_ids);
                $item->global_tags()->attach($attach_global_ids);
            }
            if ($has_onps) {
                $item->onps()->detach($detach_onp_ids);
                $attach_onps->each(function (array $toAttach) use ($item) {
                    $item->onps()->attach([$toAttach['id'] => ['value' => $toAttach['val']]]);
                });

                $update_onps->each(function (array $toUpdate) use ($item) {
                    $item->onps()->updateExistingPivot($toUpdate['id'], ['value' => $toUpdate['val']]);
                });
            }
        });

        return [
            'item' => $item,
            // 'module_tags' => $item->module_tag(),
            // 'global_tags' => $item->global_tags(),
            // 'onps' => $item->onps(),
        ];
    }
}
