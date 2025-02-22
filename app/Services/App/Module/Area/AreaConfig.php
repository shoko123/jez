<?php

namespace App\Services\App\Module\Area;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\AreaRelated;

class AreaConfig  implements ConfigInterface
{
    public static function restricted_values(): array
    {
        return ['id' => [
            'vals' => ['K', 'L', 'M', 'N', 'P', 'Q', 'S'],
        ]];
    }

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|max:1',
            'description' => 'max:2000',
            'notes' => 'max:2000',
        ];
    }

    public static function shortQuery(): array
    {
        return ['select' => ['description']];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->description;
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => ['id', 'description', 'notes']
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Description' => $r->description,
            'Notes' => $r->notes,
        ];
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
