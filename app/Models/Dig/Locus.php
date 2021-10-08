<?php

namespace App\Models\Dig;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\BaseDigModel;
use App\Models\Dig\Find;

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
    
    public function show($id)
    {
        $locus = $this->with(
            [
                'areaSeason' => function ($q) {
                    $q->select('id', 'tag');
                },
                'finds',
                'finds.findable.media',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');
                },
                'media',
            ]
        )->findOrFail($id);

        //format tag
        $locus->tag = $locus->areaSeason->tag . '/' . $locus->locus_no;
        
        //get tags
        $tags = [];
        foreach ($locus->tags as $tag) {
            array_push($tags, (object) [
                'type' => $tag->type,
                'id' => $tag->pivot->tag_id,
            ]);
        }

        //get related media.
        $itemMedia = $this->allMedia($locus);


        //get LocusFinds
        $locusFinds = $this->locusFinds($locus->tag, $locus->finds);

        //cleanup
        unset($locus->finds);
        unset($locus->tags);

        return [
            "item" => $locus,
            "locusFinds" => $locusFinds,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
        ];
    }
 
    protected function locusFinds($locus_tag, $finds)
    {
        $order = array("Pottery" => 1, "Stone" => 2, "Lithic" => 3, "Metal" => 4, "Glass" => 5, "Flora" => 6, "Fauna" => 7, "Tbd" => 8);
        $locusFinds = [];

        foreach ($finds as $index => $find) {
            //set type to order by.
            $type = $find->findable_type;

            //format tag
            $tag = "(" . $find->findable_type . ") ";
            $tag .= $this->findTag($locus_tag, $find);

            //create formatted find with media info. (media was preloaded in query)
            $formatted = $this->primaryMedia($find->findable);

            //add fields
            $formatted->tag = "(" . $find->findable_type . ") " . $this->findTag($locus_tag, $find);
            $formatted->findable_type = $find->findable_type;
            $formatted->findable_id = $find->findable_id;
            $formatted->description = $find->findable->description;

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
}
