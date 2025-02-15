<?php

namespace App\Services\App\Module\Specific\Stone;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\SmallFind\SmallFindTrait;

class StoneConfig implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'locus_id' => 'required|exists:loci,id',
            'code' => 'required|in:GS,AR',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:1,99',
            'date_retrieved' => 'date|nullable',
            'field_description' => 'max:400',
            'field_notes' => 'max:400',
            'artifact_count' => 'max:10',
            'square' => 'max:20',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            //
            'description' => 'max:400',
            'notes' => 'max:400',
            'weight' => 'numeric|nullable|min:1|max:500',
            'length' => 'numeric|nullable|min:1|max:500',
            'width' => 'numeric|nullable|min:1|max:500',
            'depth' => 'numeric|nullable|min:1|max:500',
            'thickness_min' => 'numeric|nullable|min:1|max:500',
            'thickness_max' => 'numeric|nullable|min:1|max:500',
            'perforation_diameter_max' => 'numeric|nullable|min:1|max:500',
            'perforation_diameter_min' => 'numeric|nullable|min:1|max:500',
            'perforation_depth' => 'numeric|nullable|min:1|max:500',
            'diameter' => 'numeric|nullable|min:1|max:500',
            'rim_diameter' => 'numeric|nullable|min:1|max:500',
            'rim_thickness' => 'numeric|nullable|min:1|max:500',
            'base_diameter' => 'numeric|nullable|min:1|max:500',
            'base_thickness' => 'numeric|nullable|min:1|max:500',
            'stone_primary_classification_id' => 'required|exists:stone_primary_classifications,id',
            'material_id' => 'required|exists:stone_materials,id',
        ];
    }

    public static function derivedId(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['locus_id'] . $attributes['code'] .  str_pad($attributes['basket_no'], 2, '0', STR_PAD_LEFT) .  str_pad($attributes['artifact_no'], 2, '0', STR_PAD_LEFT)
        );
    }

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['description'] ?? '[No description]'
        );
    }

    public static function dateFields(): array
    {
        return ['date_retrieved'];
    }

    public static function enumFields(): array
    {
        return [];
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
            'Material' => [
                'code' => 'LV',
                'field_name' => 'material_id',
                'lookup_table_name' => 'stone_materials',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'field_name' => 'stone_primary_classification_id',
                'lookup_table_name' => 'stone_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Life-Stage' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Morphology' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Profile' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Production' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Use-Wear' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Type-Passive' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Passive']],
            ],
            'Type-Active' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Active (handheld)']],
            ],
            // 'Vessel Types' => [
            //     'code' => 'TM',
            //     'multiple' => true,            
            //     'dependency' => ['Basic Typology:Vessel'],
            // ],
            'Vessel-Part' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel']],
            ],
            'Vessel-Base' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel']],
            ],
            'Vessel-Wall' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel']],
            ],
            'Vessel-Rim' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel']],
            ],
            'Type-Non-Processor' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Non-Processor']],
            ],
            'Search-ID' => [
                'label' => 'Search-ID',
                'code' => 'SF',
                'field_name' => 'id',
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

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_retrieved',
                'description',
                'notes'
            ],
            'lookups' => [
                'material_id' => 'material',
                'stone_primary_classification_id' => 'primaryClassification'
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'description'];
    }

    // Tagger
    public static function allowed_tagger_field_names(): array
    {
        return ['stone_primary_classification_id', 'material_id'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }
}
