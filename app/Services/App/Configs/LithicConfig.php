<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\SmallFindTrait;
use App\Services\App\Services\MediaService;
use App\Services\App\Services\TagService;

class LithicConfig  implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'locus_id' => 'required|exists:loci,id',
            'code' => 'required|in:AR,FL',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:0,99',
            'date_retrieved' => 'date|nullable',
            'field_description' => 'max:100',
            'registration_notes' => 'max:100',
            'specialist_notes' => 'max:100',
            'data.onps' => 'array',
            'data.onps.*.id' => 'required|exists:lithic_onps,id',
            'data.onps.*.value' => 'required|numeric|between:1,999',
        ];
    }

    public static function specialFields(): array
    {
        return [
            'dates' => ['date_retrieved'],
            'onps' => true,
        ];
    }

    public static function showQuery(): array
    {
        return [
            'with' => [
                'module_tags.tag_group',
                'global_tags.tag_group',
                'media' => function ($query) {
                    $query->orderBy('order_column')->limit(1);
                },
                'onps'
            ]
        ];
    }

    public static function showFormat(DigModuleModel $m): array
    {
        return [
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags', 'onps']),
            'media' => MediaService::format_media_collection($m->media),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => $m->onps->map(function ($onp, int $key) {
                return ['group_label' => $onp->group_label, 'label' => $onp->label, 'value' => $onp->pivot->value, 'shift' => $onp->shift];
            })
        ];
    }

    public static function shortQuery(): array
    {
        return [
            'select' => ['field_description'],
            'with' => ['onps']
        ];
    }

    public static function shortFormat(DigModuleModel $r): string
    {
        if (count($r->onps) === 0) {
            return $r->field_description ?? '[No typology or description given]';
        }

        $all = $r->onps->reduce(function (?string $carry, object $item) {
            return $carry .= $item['label'] . '(' . $item['pivot']['value'] . '), ';
        });

        return  substr($all, 0, -2);
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'date_retrieved',
                'weight',
                'field_description',
                'specialist_notes'
            ],
            'with' => ['onps']
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        $counts_text = (count($r->onps) === 0) ? '[Not Given]' : substr($r->onps->reduce(function (?string $carry, object $item) {
            return $carry .= $item['label'] . '(' . $item['pivot']['value'] . '), ';
        }), 0, -2);

        return [
            'id' => $r->id,
            'date_retrieved' => $r->date_retrieved,
            'Counts' => $counts_text,
            'Field Description' => $r->field_description,
            'Specialist Notes' => $r->specialist_notes,
            // 'registration_notes' => $r->registration_notes,
            // 'weight' => $r->weight,
        ];
    }

    public static function groups(): array
    {
        return [
            'Registration Code' => [
                'code' => 'EM',
                'field_name' => 'code',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Typology' => [
                'code' => 'ON',
                'field_name' => 'group_label',
                'group_name' => 'Count'
            ],
            'Order By' => [
                'code' => 'OB',
                'options' => static::smallFindOrderByOptions(true)
            ]
        ];
    }

    // Filters groups/fields
    public static function allowed_categorized_filter_group_names(): array
    {
        return ['Registration Scope'];
    }

    public static function allowed_search_field_names(): array
    {
        return ['periods', 'description'];
    }

    public static function discreteFilterOptions(): array
    {
        return array_merge(static::smallFindDiscreteFilterOptions(true), [
            'Primary Classification' => 'primary_classification_id',
        ]);
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        foreach ($groups as $key => $group) {
            switch ($group['group_name']) {
                case 'Registration Scope':
                    $builder =  static::filterScope($builder, $group['selected']);
                    break;

                default:
                    // Throw exception
            }
            return $builder;
        }
    }

    private static function filterScope(Builder $builder, array $vals): Builder
    {
        if (count($vals) !== 1) {
            return $builder;
        }

        $builder->Where(function ($query) use ($vals) {
            if ($vals[0]['name'] === 'Basket') {
                $query->where('artifact_no', 0);
            } else {
                $query->Where('artifact_no', '!=', 0);
            }
        });

        return $builder;
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    // Tagger
    public static function allowed_tagger_field_names(): array
    {
        return ['lithic_primary_classification_id'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }
}
