<?php

namespace App\Services\App;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;

interface ConfigInterface
{
    public const modules = [
        'Area',
        'Season',
        'Survey',
        'Locus',
        'Ceramic',
        'Fauna',
        'Glass',
        'Lithic',
        'Metal',
        'Stone',
    ];

    public static function fieldsValidation(): array;
    public static function short(): Attribute;

    public static function dateFields(): array;
    public static function allowed_search_field_names(): array;

    // trio
    public static function groups(): array;

    // filter validations
    public static function allowed_categorized_filter_group_names(): array;
    public static function discreteFilterOptions(): array;
    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder;
    public static function defaultOrderBy(): array;

    // Pages
    public static function tabularPage(): array;
    public static function galleryPage(): array;

    // Show
    public static function relatedModules(string $id): array;

    // Tagging
    public static function allowed_tagger_field_names(): array;
}
