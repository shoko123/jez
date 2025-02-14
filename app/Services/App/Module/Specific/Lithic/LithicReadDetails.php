<?php

namespace App\Services\App\Module\Specific\Lithic;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Module\ReadDetailsInterface;
use App\Services\App\Related\SmallFindsRelatedService;
use App\Services\App\Module\SmallFindsTrait;

class LithicReadDetails implements ReadDetailsInterface
{
    use SmallFindsTrait;

    private static Builder $builder;

    public static function discreteFilterOptions(): array
    {
        return array_merge(self::smallFindDiscreteFilterOptions(true), [
            'Primary Classification' => 'lithic_primary_classification_id',
        ]);
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        self::$builder = $builder;

        foreach ($groups as $key => $group) {
            switch ($group['group_name']) {
                case 'Registration Scope':
                    self::filterScope($group['selected']);
                    break;

                default:
                    // Do nothing
            }
        }
        return self::$builder;
    }

    private static function filterScope(array $vals)
    {
        if (count($vals) !== 1) {
            return;
        }

        self::$builder->Where(function ($query) use ($vals) {
            switch ($vals[0]['name']) {
                case 'Basket':
                    $query->where('artifact_no', 0);
                    return;

                case 'Artifact':
                    $query->Where('artifact_no', '!=', 0);
                    return;

                default:
                    return;
            }
        });
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    public static function orderByOptions(): array
    {
        return array_merge(self::smallFindOrderByOptions(true), [
            'Registration Code' => 'code',
        ]);
    }

    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'date_retrieved',
                'weight',
                'field_description',
                'registration_notes',
                'specialist_notes'
            ],
            'onps' => []
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'field_description'];
    }

    public static function relatedModules(string $id): array
    {
        $sf = new SmallFindsRelatedService();
        return $sf->relatedModules(substr($id, 0, 5));
    }
}
