<?php

namespace App\Services\App\Module\Specific\Lithic;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\SmallFind\SmallFindTrait;

class LithicConfig implements ConfigInterface
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

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['field_description'] ?? '[No field description]'
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

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_retrieved',
                'weight',
                'field_description',
                'registration_notes',
                'specialist_notes'
            ],
            'onps' => []
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'field_description'];
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
