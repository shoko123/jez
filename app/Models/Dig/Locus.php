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
            ['areaSeason' => function ($q) {
                $q->select('id', 'tag');},
                'finds' => function ($q) {
                    $q->select('locus_id', 'findable_type', 'findable_id', 'registration_category', 'basket_no', 'artifact_no', 'piece_no', 'description')
                        ->orderBy('findable_type', 'ASC')
                        ->orderBy('registration_category', 'ASC')
                        ->orderBy('basket_no', 'ASC')
                        ->orderBy('artifact_no', 'ASC')
                        ->orderBy('piece_no', 'ASC');},
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media',
            ])->findOrFail($id);

        $locus->tag = $locus->areaSeason->tag . '/' . $locus->locus_no;

        //get related media.
        $itemMedia = $this->allMedia($locus);

        //LocusFinds
        $locusFinds = $this->locusFinds($locus->tag, $locus->finds);

        //get tags
        $tags = [];
        foreach ($locus->tags as $tag) {
            array_push($tags, (object) [
                'type' => $tag->type,
                'id' => $tag->pivot->tag_id,
            ]);
        }

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
            //format tag
            $tag = "(" . $find->findable_type . ") " . $locus_tag . ".";
            $tag .= $this->getFindPortionOfTag($locus_tag, $find); //implemented in BaseDigModel
            $type = $find->findable_type;
            //load find instance with media and pick primary media item
            $findModelName = 'App\Models\Dig\\' . $find->findable_type;
            $instance = $findModelName::with('media')->findOrFail($find->findable_id);
            $findMediaItem = $this->primaryMedia($instance);
            $findMediaItem->tag = $tag; //'(' . $find->findable_type . ') ' . $find->registration_category . '.' . ($find->basket_no ? $find->basket_no : "") . (($find->basket_no && $find->artifact_no) ? "." : "") . ($find->artifact_no ? $find->artifact_no : "");
            $findMediaItem->findable_type = $find->findable_type;
            $findMediaItem->findable_id = $find->findable_id;
            $findMediaItem->description = $instance->description;
            $findMediaItem->type_order = $order[$type];
            array_push($locusFinds, $findMediaItem);
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
