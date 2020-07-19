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
        $types = [];
        $builder->join('finds', function ($join) {
            $join->on('stones.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', 'Stone');
        })

            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->select('stones.id', 'stones.description', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag');

        foreach ($filters["tagParams"] as $param) {
            $type = "Stone:" . $param["type"];
            $names = [];
            foreach ($param["tags"] as $index => $tag) {
                $names[$index] = $tag["name"];
            }
            $tagNames = $param["tags"];
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
