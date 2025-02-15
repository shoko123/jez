<?php

namespace App\Services\App\Module\Specific\Glass;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\SmallFind\SmallFindTrait;

class GlassConfig implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'locus_id' => 'required|exists:loci,id',
            'code' => 'required|in:AR',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:0,99',
            'date_retrieved' => 'date|nullable',
            'field_description' => 'max:400',
            'field_notes' => 'max:400',
            'artifact_count' => 'max:10',
            'square' => 'max:20',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            //
            'description' => 'max:400',
            'rim_diameter' => 'numeric|nullable|between:1,500',
            'base_diameter' => 'numeric|nullable|between:1,500',
            'bangle_diameter' => 'numeric|nullable|between:1,500',
            'bead_diameter' => 'numeric|nullable|between:1,500',
            'pontil_diameter' => 'numeric|between:1,500',
            'primary_classification_id' => 'required|exists:glass_primary_classifications,id',
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
            get: fn(mixed $value, array $attributes) => $attributes['specialist_description'] ?? '[No specialist description]'
        );
    }

    public static function dateFields(): array
    {
        return ['date_retrieved'];
    }

    public static function enumFields(): array
    {
        return ['specialist'];
    }

    public static function groups(): array
    {
        return [
            'Primary Classification' => [
                'code' => 'LV',
                'field_name' => 'primary_classification_id',
                'lookup_table_name' => 'glass_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Production' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Vessel-Subtype' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel/Lamp']],
            ],
            'Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Weathering' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Weathering-Type' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
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
        return ['specialist_description'];
    }

    public static function discreteFilterOptions(): array
    {
        return array_merge(static::smallFindDiscreteFilterOptions(false), [
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
                'field_description',
                'specialist_description'
            ],
            'lookups' => [
                'primary_classification_id' => 'primaryClassification'
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'specialist_description'];
    }

    public static function allowed_tagger_field_names(): array
    {
        return ['primary_classification_id'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }

    // Tagger
}
