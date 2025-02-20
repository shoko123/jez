<?php

namespace App\Services\App\Module\Survey;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\ConfigInterface;

class SurveyConfig implements ConfigInterface
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

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->description ?? '[No description given]';
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

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'description',
                'elevation',
                'surveyed_date',
                'notes'
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
