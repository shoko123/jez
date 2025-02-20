<?php

namespace App\Services\App\Module\Metal;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\ConfigInterface;
use App\Services\App\SmallFind\SmallFindTrait;

class MetalConfig implements ConfigInterface
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

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['specialist_description'] ?? '[No Specialist Description]'
        );
    }

    public static function dateFields(): array
    {
        return ['date_retrieved'];
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

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_retrieved',
                'field_description',
                'specialist_description',
            ],
            'lookups' => [
                'material_id' => 'material',
                'primary_classification_id' => 'primaryClassification'
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'specialist_description'];
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
