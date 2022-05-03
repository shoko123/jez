<?php

namespace App\Models\Dig;

use App\Models\ItemTag;
use App\Models\Tags\FaunaTag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;
use App\Models\Dig\AreaSeason;
use App\Models\Dig\Locus;
use Illuminate\Database\Eloquent\Collection;

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
                $builder = $this->select('id', 'name AS dot');
                break;
            case "Season":
                $builder = $this->select('id', 'season AS dot', DB::raw("CONCAT(season) as dot"));
                break;
            case "AreaSeason":
                $builder = $this->select('id', 'dot');
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

        $collection = $builder->get();

        /*
        if ($this->eloquent_model_name === 'AreaSeason') {
            foreach ($collection as $item) {
                $item->dot = str_replace('/', '.', $item->tag);;
            }
        }
        if ($this->eloquent_model_name === 'Season') {
            foreach ($collection as $item) {
                $item->dot = strval($item->dot);
            }
        }
        */
        return $collection;
    }

    public function indexForLocus($queryParams)
    {
        $builder = $this->leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');

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
        $builder->select("loci.id AS id", DB::raw("CONCAT(areas_seasons.dot,'.',locus_no) as dot"));

        //get results
        $collection = $builder->get();

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
                        switch (count($ids)) {
                            case 1:
                                if ($b) {
                                    $builder->where('basket_no', '!=', 0)->where('artifact_no', 0);
                                } elseif ($a) {
                                    $builder->where('artifact_no', '!=', 0);
                                }
                                break;
                            case 2:
                                //all
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
            if (!empty($queryParams["tags"]["globals"]) ){
                //global tags filtering

                $tag_types = (object) [];
                foreach ($queryParams["tags"]["globals"] as $index => $tag_id) {
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
            if (!empty($queryParams["tags"]["module"]) ){
                //module tags filtering

                //organize tags by tag_type
                $modelName = "App\\Models\\Tags\\" . $this->eloquent_model_name . "Tag";
                $model = new $modelName;
                $types = [];
                      
                foreach ($queryParams["tags"]["module"] as $index => $tag_id) {                                       
                    $item = $model->select('type_id')->findOrFail($tag_id);
                    
                    if (array_key_exists($item->type_id, $types)) {
                        array_push($types[$item->type_id], $tag_id);
                    } else {
                        $types[$item->type_id] = [$tag_id];
                    }
                }

                //filter
                foreach ($types as $type_id => $x) {
                    $builder->whereHas('module_tags', function (Builder $q) use ($x) {      
                        $q->whereIn('id', $x);
                    });
                }           
            }
        }

        //order
        $builder->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.artifact_no');

        //format tag
        $builder->select("$tableName.id AS id", DB::raw("CONCAT(areas_seasons.dot, '.' ,locus_no ,'.', finds.registration_category ,'.', finds.basket_no  ,'.', finds.artifact_no) as dot"));

        $collection = $builder->get();

        return $collection;
    }

    //format find's tag. relies only on the $find builder result parameter
    public function findDot($find)
    {
        return $find->registration_category . '.' . $find->basket_no . '.' . $find->artifact_no;
    }

    public function getIdsFromParams($p)
    {
        $modelName = "App\Models\Dig\\" . $p["module"];
        $model =  new $modelName;

        switch ($p["module"]) {
            case "About":
                return ["id" => $model->where('tab', $p["tab"])->where('no', $p["no"])->pluck('id')->first()];

                break;
            case "Area":
                return  ["id" => $model->where('name', $p["area"])->pluck('id')->first()];

                break;

            case "Season":
                return  ["id" => $model->where('season', $p["season"])->pluck('id')->first()];
                break;


            case "AreaSeason":
                return  ["id" => $model->where('dot', $p["season"] . '.' . $p["area"])->pluck('id')->first()];

            case "Locus":
                $area_season_id = AreaSeason::where('dot',  $p["season"] . '.' . $p["area"])->pluck('id')->first();
                if (is_null($area_season_id)) {
                    return null;
                }
                return  [
                    "id" => $model->where('area_season_id', $area_season_id)->where('locus_no', $p["locus_no"])->pluck('id')->first(),
                    "area_season_id" => $area_season_id
                ];

            case "Pottery":
            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
            case "Flora":
            case "Fauna":
            case "Tbd":
                $area_season_id = AreaSeason::where('dot', $p["season"] . '.' . $p["area"])->pluck('id')->first();
                if (is_null($area_season_id)) {
                    return null;
                }
                $locus_id = Locus::where('area_season_id', $area_season_id)->where('locus_no', $p["locus_no"])->pluck('id')->first();
                if (is_null($locus_id)) {
                    return null;
                }
                return  [
                    "id" => Find::where('findable_type', $p["module"])
                        ->where('locus_id', $locus_id)
                        ->where('registration_category', $p["registration_category"])
                        ->where('basket_no', $p["basket_no"])
                        ->where('artifact_no', $p["artifact_no"])
                        ->pluck('findable_id')->first(),
                    "locus_id" => $locus_id,
                    "registration_category" => $p["registration_category"],
                    "basket_no" => $p["basket_no"],
                    "artifact_no" => $p["artifact_no"],
                ];
        }
        return null;
    }

    //show common to all small finds
    public function show($p)
    {
        /*
        if ( in_array($p["module"], ["Fauna", "Glass"])) {
            $builder = $this->with(
                [
                    'find',
                    'find.locus' => function ($query) {
                        $query->select('id', 'locus_no', 'area_season_id');
                    },
                    'find.locus.areaSeason' => function ($query) {
                        $query->select('id', 'dot');
                    },
                   
                    'module_tags',
                    //'module_tags.tag_type',
                    'media',
                ]
            );
        } else {
            $builder = $this->with(
                [
                    'find',
                    'find.locus' => function ($query) {
                        $query->select('id', 'locus_no', 'area_season_id');
                    },
                    'find.locus.areaSeason' => function ($query) {
                        $query->select('id', 'dot');
                    },
                    'tags' => function ($query) {
                        $query->select('id', 'name', 'type');
                    },
                    'media',
                ]
            );
        }
        */
        $builder = $this->with(
            [
                'find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'area_season_id');
                },
                'find.locus.areaSeason' => function ($query) {
                    $query->select('id', 'dot');
                },
               
                'module_tags',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');
                },
                'media',
            ]
            );
        //$builder->select("$tableName.id AS id", DB::raw("CONCAT(finds.loci.areas_seasons.tag,'/',finds.loci.locus_no ,'.', finds.registration_category ,'.', finds.basket_no  ,'.', finds.artifact_no) as tag"));

        $item = $builder->findOrFail($p["id"]);


        //format tag
        $find = $item->find;
        $item->dot = $find->locus->areaSeason->dot . "." . $find->locus->locus_no . "." . $find->registration_category . "." . $find->basket_no . "." . $find->artifact_no;
        $dotWithoutArtifactNo = $find->locus->areaSeason->dot . "." . $find->locus->locus_no . "." . $find->registration_category . "." . $find->basket_no . ".";

        //add fields
        $item->locus_id = $find->locus->id;
        $item->area_season_id = $find->locus->areaSeason->id;
        $item->locus_id = $find->locus->id;

        $find->locus_id = $find->locus->id;
        $find->area_season_id = $find->locus->areaSeason->id;

        //format tags
        $tags = [];
        $moduleTags = [];
        //if ( in_array($p["module"], ["Fauna", "Glass"])) {
            foreach ($item->module_tags as $tag) {
                array_push($moduleTags, (object) [
                    'type_id' => $tag->type_id,
                    'type' => $tag->tag_type->name,
                    'id' => $tag->pivot->tag_id,
                    'name' => $tag->name
                ]);
            }
        //} else {
            foreach ($item->tags as $tag) {
                array_push($tags, (object) [
                    'type' => $tag->type,
                    'id' => $tag->pivot->tag_id,
                ]);
            }
        //}


        //format media.
        $itemMedia = $this->allMedia($item);
        $item["hasMedia"] = $itemMedia->primary->hasMedia;
        $item["tnUrl"] = $itemMedia->primary->tnUrl;
        $item["fullUrl"] = $itemMedia->primary->fullUrl;


        //if Pottery or Fauna add related artifacts
        $related = [];

        if ($p["module"] === "Pottery" || $p["module"] === "Fauna") {
            $res = Find::where('findable_type', $p["module"])
                ->where('locus_id', $p["locus_id"])
                ->where('basket_no', $p["basket_no"])
                ->where('artifact_no', '<>', $p["artifact_no"])
                ->orderBy('artifact_no')
                ->get()->pluck('artifact_no');
            $related = collect($res)->map(function ($item) use ($dotWithoutArtifactNo) {
                return $dotWithoutArtifactNo . $item;
            });
        }


        unset($itemMedia->primary);
        unset($item->find);
        unset($item->media);
        unset($item->tags);
        unset($find->locus);


        return [
            "item" => $item,
            "find" => $find,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
            "moduleTags" => $moduleTags,
            "related" => $related
        ];
    }

    public function chunk($p)
    {
        $modelName = "App\Models\Dig\\" . $p["module"];
        $model = new $modelName;
        $ids = implode(',', $p["ids"]);

        $items = $model->whereIn('id', $p["ids"])
            ->select('id', 'description')
            ->orderByRaw(DB::raw("FIELD(id, $ids)"))
            ->get();

        if ($p["chunkType"]  === "Media") {
            foreach ($items as $index => $item) {
                $media = $this->primaryMedia($item);
                $item["fullUrl"] = $media->fullUrl;
                $item["hasMedia"] = $media->hasMedia;
                $item["tnUrl"] = $media->tnUrl;
                unset($item->media);
            }
        }
        return $items;
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
            }
        }
    }

    public function allMedia($item)
    {
        $reflect = new \ReflectionClass($item);
        $eloquent_model_name = $reflect->getShortName();

        $media = (object) ["collection" => []];

        $drawings = $item->getMedia('drawing');

        foreach ($drawings as $med) {
            array_push($media->collection, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => true, 'media_id' => $med->id]);
        }

        $photos = $item->getMedia('photo');

        foreach ($photos as $med) {
            array_push($media->collection, (object)['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => true, 'media_id' => $med->id]);
        }

        if (empty($media->collection)) {
            $media->primary = (object) $this->filler($eloquent_model_name);
        } else {
            $media->primary = (object) $media->collection[0];
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
