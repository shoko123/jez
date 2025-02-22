<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;

class SurveyConfig  implements ConfigInterface
{
    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:2|max:5',
            'area_id' => 'required|exists:areas,id',
            'feature_no' => 'required|numeric|between:1,200',
            'surveyed_date' => 'date|nullable',
            'elevation' => 'numeric|between:0,200|nullable',
            'next_to' => 'max:50|nullable',
            'description' => 'max:1000|nullable',
            'notes' => 'max:100|nullable',
        ];
    }

    public static function shortQuery(): array
    {
        return ['select' => ['description']];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->description ?? '[No description given]';
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'description',
                'elevation',
                'surveyed_date',
                'notes'
            ],
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Description' => $r->description,
            'Elevation' => $r->elevation,
            'Surveyed Date' => $r->surveyed_date,
            'Notes' => $r->notes,
        ];
    }

    public static function dateFields(): array
    {
        return ['surveyed_date'];
    }

    public static function groups(): array
    {
        return [
            'Search Description' => [
                'code' => 'SF',
                'field_name' => 'description',
            ],
            'Order By' =>  [
                'code' => 'OB',
                'options' => [
                    'Area' => 'area_id',
                    'Feature No.' => 'feature_no'
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
        return ['description'];
    }

    public static function discreteFilterOptions(): array
    {
        return ['Area' => 'area_id'];
    }

    public static function defaultOrderBy(): array
    {
        return ['area_id' => 'asc', 'feature_no' => 'asc'];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
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
