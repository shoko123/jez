<?php

namespace App\Services\App\Module\Season;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\BaseConfig;
use App\Models\Module\DigModuleModel;
use App\Services\App\ConfigInterface;
use App\Services\App\Module\Season\SeasonRelated;

class SeasonConfig  extends BaseConfig implements ConfigInterface
{
    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|max:1',
            'description' => 'max:2000',
            'staff' => 'max:2000',
        ];
    }

    public static function restricted_values(): array
    {
        return ['id' => [
            'vals' => ['3', '4', '5', '6', '7', '8'],
            'manipulator' => function ($val) {
                return (string) ($val + 2010);
            }
        ]];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->description;
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
        return ['fields' => ['id', 'description', 'staff']];
    }

    public static function galleryPage(): array
    {
        return ['id', 'description'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return seasonRelated::relatedModules($id);
    }

    public static function allowed_tagger_field_names(): array
    {
        return [];
    }
}
