<?php

namespace App\Models\Dig;

use App\Models\BaseDigModel;
use App\Models\Dig\AreaSeason;
use App\Models\Find;
use App\Models\Tags\LocusTag;

class Locus extends BaseDigModel
{
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'loci';

    public function __construct()
    {
        parent::__construct("Locus");
    }
    public function areaSeason()
    {
        return $this->belongsTo(AreaSeason::class, 'area_season_id');
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(LocusTag::class, 'locus-locus_tags', 'item_id', 'tag_id');
    }

    public function show($ids)
    {
        $locus = $this->with(
            [
                'areaSeason' => function ($q) {
                    $q->select('id', 'dot');
                },
                'finds',
                'finds.findable.media',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');
                },
                'module_tags',
                'media',
            ]
        )->findOrFail($ids["id"]);

        //format dot
        $locus->dot = $locus->areaSeason->dot . '.' . $locus->locus_no;

        //get tags
        $tags = [];
        $moduleTags = [];

        foreach ($locus->module_tags as $tag) {
            array_push($moduleTags, (object) [
                'type_id' => $tag->type_id,
                'type' => $tag->tag_type->name,
                'id' => $tag->pivot->tag_id,
                'name' => $tag->name
            ]);
        }

        //get related media.
        $itemMedia = $this->allMedia($locus);
        $locus["hasMedia"] = $itemMedia->primary->hasMedia;
        $locus["tnUrl"] = $itemMedia->primary->tnUrl;
        $locus["fullUrl"] = $itemMedia->primary->fullUrl;
        unset($itemMedia->primary);

        //get LocusFinds
        $locusFinds = $this->formatLocusFinds($locus->dot, $locus->finds);

        //cleanup
        unset($locus->finds);
        unset($locus->tags);
        unset($locus->media);
        return [
            "item" => $locus,
            "locusFinds" => $locusFinds,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
            "moduleTags" => $moduleTags,
        ];
    }

    protected function formatLocusFinds($locus_dot, $finds)
    {
        $order = array("Pottery" => 1, "Stone" => 2, "Lithic" => 3, "Metal" => 4, "Glass" => 5, "Flora" => 6, "Fauna" => 7, "Tbd" => 8);
        $locusFinds = [];

        foreach ($finds as $index => $find) {
            //set type to order by.
            $type = $find->findable_type;


            //create formatted find with media info. (media was preloaded in query)
            $formatted = $this->primaryMedia($find->findable);

            //add fields
            $formatted->module = $find->findable_type;            
            $formatted->id = $find->findable_id;
            $formatted->dot = $locus_dot . '.' . $this->findDot($find);                     
            $formatted->tag = $find->findable_type . " " . str_replace(".", "/", $locus_dot) . "." . $this->findDot($find);
            $formatted->description = $find->findable->description;            
            
            $formatted->findable_type = $find->findable_type;
            $formatted->findable_id = $find->findable_id;

            //deal with order
            $formatted->type_order = $order[$type];
            array_push($locusFinds, $formatted);
        }

        //sort finds by type, registration (Pottery, Stone, Lithic, Metal...)
        usort($locusFinds, function ($a, $b) {
            if ($a->type_order === $b->type_order) {
                return strcmp($a->tag, $b->tag);
            }
            return $a->type_order < $b->type_order ? -1 : 1;
        });

        foreach ($locusFinds as $index => $find) {
            unset($find->type_order);
        }
        return $locusFinds;
    }
    
    public function locusAllFinds($locus_id)
    {
        $order = array("Pottery" => 1, "Stone" => 2, "Lithic" => 3, "Metal" => 4, "Glass" => 5, "Flora" => 6, "Fauna" => 7, "Tbd" => 8);
        $locusFinds = [];

        $locus = $this->with(
            [
                'areaSeason' => function ($q) {
                    $q->select('id', 'dot');
                },
                'finds',
                'finds.findable.media',
            ])->findOrFail($locus_id);

        $locus_dot = $locus->areaSeason->dot . '.' . $locus->locus_no;

        foreach ($locus->finds as $index => $find) {
            //set type to order by.
            $module = $find->findable_type;


            //create formatted find with media info. (media was preloaded in query)
            $formatted = $this->primaryMedia($find->findable);

            //add fields
            $formatted->module = $find->findable_type;
            $formatted->id = $find->findable_id;
            //$formatted->tag = $find->findable_type . " " . str_replace(".", "/", $locus_dot) . "." . $this->findDot($find);
            $formatted->dot = $locus_dot . '.' . $this->findDot($find);
            
            $formatted->description = $find->findable->description;

            //deal with order
            $formatted->type_order = $order[$module];
            array_push($locusFinds, $formatted);
        }

        //sort finds by type, registration (Pottery, Stone, Lithic, Metal...)
        usort($locusFinds, function ($a, $b) {
            if ($a->type_order === $b->type_order) {
                return strcmp($a->dot, $b->dot);
            }
            return $a->type_order < $b->type_order ? -1 : 1;
        });

        foreach ($locusFinds as $index => $find) {
            unset($find->type_order);
        }
        return $locusFinds;
    }
}
