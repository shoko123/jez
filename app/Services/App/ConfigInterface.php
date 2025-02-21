<?php

namespace App\Services\App;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Module\DigModuleModel;

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
    public static function shortWith(): array; // default (empty array) is defined in BaseConfig
    public static function shortFormat(DigModuleModel $model): string;
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
    public static function tabularPageQuery(): array;
    public static function tabularPageFormat(DigModuleModel $r): array;

    // Show
    public static function relatedModules(string $id): array;

    // Tagging
    public static function allowed_tagger_field_names(): array;
}
