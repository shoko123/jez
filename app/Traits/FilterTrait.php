<?php

namespace App\Traits;

trait FilterTrait
{

    /**
     * add filtering.
     *
     * @param  $builder: query builder.
     * @param  $filters: array of filters.
     * @return query builder.
     */
    public function scopeFilter($builder, $filters)
    {
        $tableName = $this->getTable();
        $modelName = (new \ReflectionClass($this))->getShortName();
        $builder->join('finds', function ($join) use($tableName, $modelName){
            $join->on($tableName . '.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=',  $modelName);
        })

            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');

        foreach ($filters["tagParams"] as $param) {
            $type = "Stone:" . $param["type"];
            $names = [];
            foreach ($param["tags"] as $index => $tag) {
                $names[$index] = $tag["name"];
            }
            $builder->withAnyTags($names, $type);
        }

        if ($filters["media"]) {
            $builder->has('media');
        }
        $builder->with('media')->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.item_no');
        return $builder;

        foreach ($filters as $field => $value) {
            if (in_array($field, $this->boolFilterFields) && $value != null) {
                $builder->where($field, (bool) $value);
                continue;
            }
            if (!in_array($field, $defaultFillableFields) || !$value) {
                continue;
            }
            if (in_array($field, $this->likeFilterFields)) {
                $builder->where($tableName . '.' . $field, 'LIKE', "%$value%");
            } else if (is_array($value)) {
                $builder->whereIn($field, $value);
            } else {
                $builder->where($field, $value);
            }
        }
        return $builder;
    }
}
