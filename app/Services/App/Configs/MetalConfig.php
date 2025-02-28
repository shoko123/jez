<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\SmallFindTrait;
use App\Services\App\Services\MediaService;
use App\Services\App\Services\TagService;

class MetalConfig  implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'code' => 'required|in:AR',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:0,99',
            'date_retrieved' => 'date|nullable',
            'field_description' => 'max:400',
            'square' => 'max:20',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            //
            'specialist_description' => 'max:400',
            'measurements' => 'max:200',
            'material_id' => 'required|exists:metal_materials,id',
            'primary_classification_id' => 'required|exists:metal_primary_classifications,id',
            'specialist' => 'required|in:Unassigned,UE Students',
        ];
    }

    public static function specialFields(): array
    {
        return [
            'dates' => ['date_retrieved'],
            'lookupVals' => ['material_id', 'primary_classification_id'],
            'enums' => ['specialist']
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
                }
            ]
        ];
    }

    public static function showFormat(DigModuleModel $m): array
    {
        return [
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags']),
            'media' => MediaService::format_media_collection($m->media),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => [],
        ];
    }

    public static function shortQuery(): array
    {
        return ['select' => ['specialist_description']];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->specialist_description ?? '[No specialist description]';
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'date_retrieved',
                'field_description',
                'specialist_description',
                'material_id',
                'primary_classification_id'
            ],
            'with' => ['material', 'primaryClassification']
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Date Retrieved' => $r->date_retrieved,
            'Field Description' => $r->field_description,
            'Specialist Description' => $r->specialist_description,
            'Material' => $r->material->name,
            'Primary Classification' => $r->primaryClassification->name,
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
            'Specialist' => [
                'code' => 'EM',
                'field_name' => 'specialist',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'field_name' => 'primary_classification_id',
                'lookup_table_name' => 'metal_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Material' => [
                'code' => 'LV',
                'field_name' => 'material_id',
                'lookup_table_name' => 'metal_materials',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Modern Weaponry' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Modern Weaponry']],
            ],
            'Field Description' => [
                'code' => 'SF',
                'field_name' => 'field_description',
            ],
            'Specialist Description' => [
                'code' => 'SF',
                'field_name' => 'specialist_description',
            ],
            'Order By' => [
                'code' => 'OB',
                'options' => static::smallFindOrderByOptions(false)
            ]
        ];
    }

    // Filters groups/fields
    public static function allowed_categorized_filter_group_names(): array
    {
        return [];
    }

    public static function allowed_search_field_names(): array
    {
        return ['field_description', 'specialist_description'];
    }

    public static function discreteFilterOptions(): array
    {
        return array_merge(static::smallFindDiscreteFilterOptions(false), [
            'Primary Classification' => 'primary_classification_id',
            'Specialist' => 'specialist'
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
        return ['material_id', 'primary_classification_id'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }
}
