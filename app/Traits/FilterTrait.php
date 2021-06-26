<?php

namespace App\Traits;

use App\Models\ItemTag;
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

        if (!empty($queryParams["registration"])) {
            foreach ($queryParams["registration"] as $key => $ids) {
                switch ($key) {
                    case "areas":
                        $builder->whereIn("area", $ids);
                        break;

                    case "seasons":
                        $builder->whereIn("season", $ids);
                        break;

                    case "registration_categories":
                        $builder->whereIn("registration_category", $ids);
                        break;

                    case "media":
                        $builder->whereHas('media', function (Builder $mediaQuery) use ($ids) {
                            $mediaQuery->whereIn('collection_name', $ids);});
                        break;

                    case "scopes":
                        $b = in_array("basket", $ids);
                        $a = in_array("artifact", $ids);
                        $p = in_array("piece", $ids);
                        switch (count($ids)) {
                            case 1:
                                if ($b) {
                                    $builder->where('basket_no', '!=', 0)->where('artifact_no', 0)->where('piece_no', 0);
                                } elseif ($a) {
                                    $builder->where('artifact_no', '!=', 0)->where('piece_no', 0);
                                } elseif ($p) {
                                    $builder->where('piece_no', '!=', 0);
                                }
                                break;
                            case 2:
                                if ($b && $a) {
                                    $builder->where('piece_no', 0);
                                } elseif ($b && $p) {
                                    $builder->where('artifact_no', 0)->orWhere('piece_no', '!=', 0);
                                } elseif ($a && $p) {
                                    $builder->where('artifact_no', '!=', 0)->orWhere('piece_no', '!=', 0);
                                }
                                break;
                        }
                        break;
                    default:
                    //throw Error
                }
            }
        }

        //filter by lookup fields
        if (!empty($queryParams["lookups"])) {
            foreach ($queryParams["lookups"] as $key => $ids) {
                //TODO validate column name.
                $builder->whereIn($key, $ids);
            }
        }

        //filter by tags
        if (!empty($queryParams["tags"])) {
            $tag_types = (object) [];
            foreach ($queryParams["tags"]["tags"] as $index => $tag_id) {
                $t = ItemTag::select('type', 'name')->findOrFail($tag_id);
                $type = $t->type;
                if (property_exists($tag_types, $type)) {
                    array_push($tag_types->$type, $t->name);
                } else {
                    $tag_types->$type = array($t->name);
                }
            }

            foreach ($tag_types as $key => $value) {
                $builder->withAnyTags($value, $key);
            }
        }

        //order
        $builder->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.artifact_no')
            ->orderBy('finds.piece_no');
        return $builder;
    }
}
