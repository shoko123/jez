<?php

namespace App\Models\Dig;

use App\Models\Dig\Area;
use App\Models\Dig\BaseDigModel;
use App\Models\Dig\Locus;
use App\Models\Dig\Season;

class AreaSeason extends BaseDigModel
{
    protected $table = 'areas_seasons';
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("AreaSeason");
    }
    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function season()
    {
        return $this->belongsTo(Season::class, 'season_id');
    }

    public function loci()
    {
        return $this->hasMany(Locus::class, 'area_season_id');
    }

    public function show($id)
    {
        $item = $this->with([
            'media',
            'loci',
        ])
            ->findOrFail($id);

        //get related media.
        $itemMedia = $this->allMedia($item);
        $item["hasMedia"] = $itemMedia->primary->hasMedia;
        $item["tnUrl"] = $itemMedia->primary->tnUrl;
        $item["fullUrl"] = $itemMedia->primary->fullUrl;
        unset($itemMedia->primary);
        
        //format related loci
        $lociWithMedia = [];
        foreach ($item->loci as $index => $locus) {
            $tag = str_replace(".", "/", $item->dot) . "/" . $locus->locus_no;
           $dot = $item->dot . "." . $locus->locus_no;
            $media = $this->primaryMedia($locus);

            array_push($lociWithMedia, [
                "id" => $locus->id,
                "description" => $locus->description,
                "tag" => $tag,
                "dot" => $dot,
                "fullUrl" => $media->fullUrl,
                "hasMedia" => $media->hasMedia,
                "tnUrl" => $media->tnUrl,
            ]);
        }

        $loci = $item->loci;
        unset($item->media);
        unset($item->loci);

        return [
            "item" => $item,
            "itemMedia" => $itemMedia,
            "loci" => $lociWithMedia,
        ];
    }
}
