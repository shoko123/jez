<?php

namespace App\Services\App\Module\Specific\Fauna;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Module\ReadDetailsInterface;
use App\Services\App\Related\SmallFindsRelatedService;
use App\Services\App\Module\SmallFindsTrait;

class FaunaReadDetails implements ReadDetailsInterface
{
    use SmallFindsTrait;

    private static Builder $builder;

    public static function discreteFilterOptions(): array
    {
        return array_merge(self::smallFindDiscreteFilterOptions(true), [
            'Taxa' => 'primary_taxon_id',
            'Primary Taxa' => 'primary_taxon_id',
            'Fauna Scope' => 'scope_id',
            'Material' => 'material_id',
            'Symmetry' => 'symmetry',
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
        return self::smallFindOrderByOptions(false);
    }

    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'taxa',
                'bone',
            ],
            'lookups' => [
                'primary_taxon_id' => 'primaryTaxon',
                'scope_id' => 'scope',
                'material_id' => 'material',
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'taxa'];
    }

    public static function relatedModules(string $id): array
    {
        $sf = new SmallFindsRelatedService();
        return $sf->relatedModules(substr($id, 0, 5));
    }
}
