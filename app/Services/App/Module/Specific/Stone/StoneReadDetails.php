<?php

namespace App\Services\App\Module\Specific\Stone;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Module\ReadDetailsInterface;
use App\Services\App\Related\SmallFindsRelatedService;
use App\Services\App\Module\SmallFindsTrait;

class StoneReadDetails implements ReadDetailsInterface
{
    use SmallFindsTrait;

    public static function discreteFilterOptions(): array
    {
        return array_merge(self::smallFindDiscreteFilterOptions(true), [
            'Primary Classification' => 'stone_primary_classification_id',
        ]);
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
        return self::smallFindOrderByOptions(true);
    }

    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_retrieved',
                'description',
                'notes'
            ],
            'lookups' => [
                'material_id' => 'material',
                'stone_primary_classification_id' => 'primaryClassification'
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'description'];
    }

    public static function relatedModules(string $id): array
    {
        $sf = new SmallFindsRelatedService();
        return $sf->relatedModules(substr($id, 0, 5));
    }
}
