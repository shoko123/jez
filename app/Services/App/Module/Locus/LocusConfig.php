<?php

namespace App\Services\App\Module\Locus;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\ConfigInterface;

class LocusConfig implements ConfigInterface
{
    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:5|max:5',
            'season_id' => 'required|exists:seasons,id',
            'area_id' => 'required|exists:areas,id',
            'locus_no' => 'required|numeric|min:1|max:999',
            'square' => 'max:20',
            'date_opened' => 'date|nullable',
            'date_closed' => 'date|nullable',
            'level_opened' => 'max:20',
            'level_closed' => 'max:20',
            'locus_above' => 'max:50',
            'locus_below' => 'max:50',
            'locus_co_existing' => 'max:50',
            'description' => 'max:500',
            'deposit' => 'max:500',
            'registration_notes' => 'max:500',
            'clean' => 'required|in:Unassigned,Yes,No',
        ];
    }

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['description']
        );
    }

    public static function dateFields(): array
    {
        return ['date_opened', 'date_closed'];
    }

    public static function groups(): array
    {
        return [
            'Square' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Clean' => [
                'code' => 'EM',
                'field_name' => 'clean',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Search Description' => [
                'code' => 'SF',
                'field_name' => 'description',
            ],
            'Search Deposit' => [
                'code' => 'SF',
                'field_name' => 'deposit',
            ],
            'Search Registration Notes' => [
                'code' => 'SF',
                'field_name' => 'registration_notes',
            ],
            'Order By' => [
                'code' => 'OB',
                'options' => [
                    'Area' => 'area_id',
                    'Season' => 'season_id',
                    'Locus No.' => 'locus_no'
                ]
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
        return ['description', 'deposit', 'registration_notes'];
    }

    public static function discreteFilterOptions(): array
    {
        return [
            'Area' => 'area_id',
            'Season' => 'season_id',
            'Clean' => 'clean'
        ];
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
    }

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_opened',
                'description',
                'deposit',
                'registration_notes'
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'description'];
    }


    public static function allowed_tagger_field_names(): array
    {
        return [];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return [];
    }

    // Tagger
}
