<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait FilterTrait
{

    /**
     * add filtering.
     *
     * @param  $builder: query builder.
     * @param  $filters: array of filters.
     * @return query builder.
     */
    public function scopeFilter($builder, $queryParams)
    {
        $tableName = $this->getTable();
        $modelName = (new \ReflectionClass($this))->getShortName();

        $builder->join('finds', function ($join) use ($tableName, $modelName) {
            $join->on($tableName . '.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', $modelName);
        })
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');
        $builder->with('media');

        //filter by lookup fields
        if (!empty($queryParams["lookups"])) {
            foreach ($queryParams["lookups"] as $index => $lookup) {
                $builder->whereIn($lookup["column_name"], $lookup["ids"]);
            }
        }

        //filter by area
        if (!empty($queryParams["areas"])) {
            $builder->whereIn('area', $queryParams["areas"]);
        }

        //filter by season
        if (!empty($queryParams["seasons"])) {
            $builder->whereIn('season', $queryParams["seasons"]);
        }

        //filter by tags
        if (!empty($queryParams["tagParams"])) {
            foreach ($queryParams["tagParams"] as $param) {
                $names = [];
                foreach ($param["tags"] as $index => $tag) {
                    $names[$index] = $tag["name"];
                }
                $builder->withAnyTags($names, $param["type"]);
            }
        }

        //filter by media
        if (!empty($queryParams["media"])) {
            $med = $queryParams["media"];
            $builder->whereHas('media', function (Builder $mediaQuery)  use ($med) {
                $mediaQuery->whereIn('collection_name', $med);});
        }
         
        //order
        $builder->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.item_no');
        return $builder;
    }
}
