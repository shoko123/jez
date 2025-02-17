<?php

namespace App\Services\App\Module\Specific\Area;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\Module\Specific\Area\AreaRelated;

class AreaConfig implements ConfigInterface
{
    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|max:1',
            'description' => 'max:2000',
            'notes' => 'max:2000',
        ];
    }

    public static function restricted_values(): array
    {
        return ['id' => [
            'vals' => ['K', 'L', 'M', 'N', 'P', 'Q', 'S'],
        ]];
    }

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['description']
        );
    }

    public static function dateFields(): array
    {
        return [];
    }

    public static function groups(): array
    {
        return [];
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
        return [];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    // Pages
    public static function tabularPage(): array
    {
        return ['fields' => ['id', 'description', 'notes']];
    }

    public static function galleryPage(): array
    {
        return ['id', 'description'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return AreaRelated::relatedModules($id);
    }

    public static function allowed_tagger_field_names(): array
    {
        return [];
    }
}
