<?php

namespace App\Services\App\Module\Specific\Survey;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Module\ReadDetailsInterface;


class SurveyReadDetails implements ReadDetailsInterface
{
    public static function discreteFilterOptions(): array
    {
        return ['Area' => 'area_id'];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    public static function orderByOptions(): array
    {
        return ['Area' => 'area_id', 'Feature No.' => 'feature_no'];
    }

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

    public static function relatedModules(string $id): array
    {
        return [];
    }
}
