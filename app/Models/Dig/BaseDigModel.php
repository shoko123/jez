<?php

namespace App\Models\Dig;

use App\Traits\MediaTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class BaseDigModel extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia, MediaTrait;
    public $timestamps = false;
    protected $guarded = [];
    protected $eloquent_model_name;

    public function __construct(string $eloquent_model_name)
    {
        $this->eloquent_model_name = $eloquent_model_name;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('tn')
            ->width(250)
            ->height(250)
            ->sharpen(10)
            ->nonQueued();
    }

    public function formatCollection(Collection $collection)
    {
        $c = $collection;
        foreach ($c as $index => $item) {
            $item = $this->formatCollectionItem($item);
        }
        return $c;
    }

    public function formatCollectionItem(Object $item)
    {
        $media = $this->primaryMedia($this->eloquent_model_name, $item);
        $item["fullUrl"] = $media->fullUrl;
        $item["hasMedia"] = $media->hasMedia;
        $item["tnUrl"] = $media->tnUrl;
        $item["tag"] = $this->getItemTag($this->eloquent_model_name, $item);
        unset($item->media);
        return $item;
    }

    public function getItemTag(string $eloquent_model_name, Object $item)
    {
        switch ($eloquent_model_name) {
            case "Area":
                return $item->name;
            case "Season":
                return $item->season + 2000;

            case "AreaSeason":
                return $item->tag;
            case "Locus":
                return $item->tag . '/' . $item->locus_no;
            case "Pottery":
            case "Stone":
            case "Lithic":
            case "Metal":
            case "Glass":
            case "Flora":
            case "Fauna":
            case "Tbd":
                return $this->getFindPortionOfTag("***", $item);
                return "****";

        }
    }

    public function formatItem(array $item)
    {
        foreach ($collection as $index => $item) {
            $media = $this->primaryMedia('Season', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            $item["tag"] = $item->name;
            unset($item->media);
        }
    }

    //format find's tag. relies only on the $find builder result parameter
    public function getFindPortionOfTag($locus_tag, $find)
    {
        $tag = $locus_tag;
        /*
        if (isset($find->locus)) {
            $tag = $find->locus->areaSeason->tag . '/' . $find->locus->locus_no . '.' . $find->registration_category;
        } else {
            $tag = $find->tag . '/' . $find->locus_no . '.' . $find->registration_category;
        }
        */
        if ($find->registration_category == 'AR') {
            $tag .= $find->basket_no . "." . $find->artifact_no;
            if ($find->piece_no !== 0) {

                $tag .= "P" . $find->piece_no;
            }
        } else {
            //format basket.artifact.piece
            if ($find->basket_no !== 0) {
                $tag .= $find->basket_no;
            }
            if ($find->artifact_no !== 0) {
                if ($find->basket_no !== 0) {
                    $tag .= ".";
                }
                $tag .= $find->artifact_no;
            }
            if ($find->piece_no !== 0) {
                if ($find->artifact_no !== 0) {
                    $tag .= ".";
                }
                $tag .= "P" . $find->piece_no;
            }
        }
        return $tag;
    }

    public function filterCollection($queryParams)
    {
        $tableName = $this->getTable();
        $modelName = $this->eloquent_model_name; //new \ReflectionClass($this->getShortName());

        $builder = $this->join('finds', function ($join) use ($tableName, $modelName) {
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
