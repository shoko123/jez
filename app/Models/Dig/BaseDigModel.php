<?php

namespace App\Models\Dig;

use App\Models\ItemTag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;


class BaseDigModel extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
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

    public function indexForAreasSeasons($queryParams)
    {
        $builder = (object)[];
        switch ($this->eloquent_model_name) {
            case "Area":
                $builder = $this->select('id', 'name AS tag');
                break;
            case "Season":
                $builder = $this->select('id', DB::raw('season + 2000 AS tag'));
                break;
            case "AreaSeason":
                $builder = $this->select('id', 'tag');
                break;
        }

        if (!empty($queryParams)) {
            foreach ($queryParams["registration"] as $key => $ids) {
                switch ($key) {
                    case "areas":
                        $builder->whereIn("area", $ids);
                        break;

                    case "seasons":
                        $builder->whereIn("season", $ids);
                        break;

                    case "media":
                        $builder->whereHas('media', function (Builder $mediaQuery) use ($ids) {
                            $mediaQuery->whereIn('collection_name', $ids);
                        });
                        break;

                    default:
                        //throw Error
                }
            }
        }

        $builder->orderBy('id', 'asc');
        return $builder->get();
    }

    public function indexForLocus($queryParams)
    {
        $builder = $this->leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');

        if (!empty($queryParams["registration.media"])) {
            $builder->with('media');
        }

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

        if (!empty($queryParams["registration"])) {
            foreach ($queryParams["registration"] as $key => $ids) {
                switch ($key) {
                    case "areas":
                        $builder->whereIn("area", $ids);
                        break;

                    case "seasons":
                        $builder->whereIn("season", $ids);
                        break;

                    case "media":
                        $builder->whereHas('media', function (Builder $mediaQuery) use ($ids) {
                            $mediaQuery->whereIn('collection_name', $ids);
                        });
                        break;
                    default:
                        //TODO throw Error
                }
            }
        }

        //order
        $builder->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc');

        //format tag
        $builder->select("loci.id AS id", DB::raw("CONCAT(areas_seasons.tag,'/',locus_no) as tag"));

        //get results
        $collection = $builder->get();

        if (!empty($queryParams["registration.media"])) {
            foreach ($collection as $index => $item) {
                unset($item->media);
            }
        }
        return $collection;
    }


    public function indexForFinds($queryParams)
    {
        $tableName = $this->getTable();
        $modelName = $this->eloquent_model_name;

        $builder = $this->join('finds', function ($join) use ($tableName, $modelName) {
            $join->on($tableName . '.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', $modelName);
        })
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');

        if (!empty($queryParams["registration.media"])) {
            $builder->with('media');
        }

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
                            $mediaQuery->whereIn('collection_name', $ids);
                        });
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

        //format tag
        $builder->select("$tableName.id AS id", DB::raw("CONCAT(areas_seasons.tag,'/',locus_no ,'.', finds.registration_category ,'.', finds.basket_no  ,'.', finds.artifact_no) as tag"));

        $result = $builder->get();

        //if query included media, delete it.
        if (!empty($queryParams["registration.media"])) {
            foreach ($result as $res) {
                unset($res->media);
            }
            $builder->with('media');
        }
        return $result;
    }

    //format find's tag. relies only on the $find builder result parameter
    public function findTag($locus_tag, $find)
    {
        $tag = $locus_tag . '.' . $find->registration_category . '.';

        if ($find->registration_category === 'AR') {
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

    public function baseShow($id)
    {
        $tableName = $this->getTable();
        $modelName = $this->eloquent_model_name;


        $builder = $this->with(
            [
                'find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'area_season_id');
                },
                'find.locus.areaSeason' => function ($query) {
                    $query->select('id', 'tag');
                },
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');
                },
                'media',
            ]
        );

        //$builder->select("$tableName.id AS id", DB::raw("CONCAT(finds.loci.areas_seasons.tag,'/',finds.loci.locus_no ,'.', finds.registration_category ,'.', finds.basket_no  ,'.', finds.artifact_no) as tag"));

        $item = $builder->findOrFail($id);

        //format tag
        $find = $item->find;
        $item->tag = $find->locus->areaSeason->tag . "/" . $find->locus->locus_no . "." . $find->registration_category . "." . $find->basket_no . "." . $find->artifact_no;

        //add fields
        $item->locus_id = $find->locus->id;
        $item->area_season_id = $find->locus->areaSeason->id;
        $item->locus_id = $find->locus->id;

        $find->locus_id = $find->locus->id;
        $find->area_season_id = $find->locus->areaSeason->id;

        //format tags
        $tags = [];
        foreach ($item->tags as $tag) {
            array_push($tags, (object) [
                'type' => $tag->type,
                'id' => $tag->pivot->tag_id,
            ]);
        }

        //format media.
        $media = $this->allMedia($item);

        unset($item->find);
        unset($item->media);
        unset($item->tags);
        unset($find->locus);

        return [
            "item" => $item,
            "find" => $find,
            "itemMedia" => $media,
            "tags" => $tags,
        ];
    }

    public function baseChunkTable($idArray)
    {
        $ids = implode(',', $idArray);

        $items = $this->whereIn('id', $idArray)
            ->select('id', 'description')
            ->orderByRaw(DB::raw("FIELD(id, $ids)"))
            ->get();

        return $items;
    }

    public function baseChunkMedia($idArray)
    {
        //TODO elaborate chosen text to display
        //e.g. item description and if empty find description? if Pottery choose periods.
        $ids = implode(',', $idArray);

        $items = $this->whereIn('id', $idArray)
            ->select('id', 'description')
            ->orderByRaw(DB::raw("FIELD(id, $ids)"))
            ->get();

        foreach ($items as $index => $item) {
            $media = $this->primaryMedia($item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return $items;
    }

    public function primaryMedia($item)
    {
        $reflect = new \ReflectionClass($item);
        $eloquent_model_name = $reflect->getShortName();

        $drawing = $item->getFirstMedia('drawing');

        if (!empty($drawing)) {
            return (object) [
                'hasMedia' => true,
                'fullUrl' => $drawing->getFullUrl(),
                'tnUrl' => $drawing->getFullUrl(),
            ];
        } else {
            $photo = $item->getFirstMedia('photo');
            if (!empty($photo)) {
                return (object) [
                    'hasMedia' => true,
                    'fullUrl' => $photo->getFullUrl(),
                    'tnUrl' => $photo->getFullUrl('tn'),
                ];
            } else {
                return $this->filler($eloquent_model_name);
                //construct filler images
                $fullMediaName = 'fillers/' . $eloquent_model_name . '0.jpg';
                $tnMediaName = 'fillers/' . $eloquent_model_name . '0-tn.jpg';
                $fullUrl = Storage::disk('app-media')->url($fullMediaName);
                $tnUrl = Storage::disk('app-media')->url($tnMediaName);
                return (object) [
                    'hasMedia' => false,
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                ];
            }
        }
    }

    public function allMedia($item)
    {
        $reflect = new \ReflectionClass($item);
        $eloquent_model_name = $reflect->getShortName();

        $media = (object) ["collection" => [], "filler" => null];

        $drawings = $item->getMedia('drawing');

        foreach ($drawings as $med) {
            array_push($media->collection, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => true, 'media_id' => $med->id]);
        }

        $photos = $item->getMedia('photo');

        foreach ($photos as $med) {
            array_push($media->collection, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => true, 'media_id' => $med->id]);
        }

        if (empty($media->collection)) {
            $media->filler = $this->filler($eloquent_model_name);
            $media->collection = [];
        }
        return $media;
    }

    public function filler(String $eloquent_model_name)
    {
        $fullMediaName = 'fillers/' . $eloquent_model_name . '0.jpg';
        $tnMediaName = 'fillers/' . $eloquent_model_name . '0-tn.jpg';
        $fullUrl = Storage::disk('app-media')->url($fullMediaName);
        $tnUrl = Storage::disk('app-media')->url($tnMediaName);
        return (object) [
            'hasMedia' => false,
            'fullUrl' => $fullUrl,
            'tnUrl' => $tnUrl,
        ];
    }
}