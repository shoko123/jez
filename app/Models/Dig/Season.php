<?php

namespace App\Models\Dig;

use App\Models\BaseDigModel;
use App\Models\Dig\AreaSeason;

class Season extends BaseDigModel
{
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Season");
    }

    public function areas_seasons()
    {
        return $this->hasMany(AreaSeason::class, 'season_id');
    }

    public function show($ids)
    {
        $item = $this->with(['media', 'areas_seasons'])->findOrFail($ids["id"]);

        //get related media.
        $itemMedia = $this->allMedia($item);

        $item["hasMedia"] = $itemMedia->primary->hasMedia;
        $item["tnUrl"] = $itemMedia->primary->tnUrl;
        $item["fullUrl"] = $itemMedia->primary->fullUrl;
        unset($itemMedia->primary);
        unset($item->media);
        $item->tag = $item->season + 2000;
        $item->dot = strval($item->season);
        //format related areas
        $areasSeasons = [];

        foreach ($item->areas_seasons as $index => $as) {

            $media = $this->primaryMedia($as);
            
            array_push($areasSeasons, [
                "module" => "AreaSeason",
                "id" => $as->id,
                "dot" => $as->dot,
                "tag" => str_replace(".", "/", $as->dot),
                "description" => $as->description,
                "hasMedia" => $media->hasMedia,
                "fullUrl" => $media->fullUrl,
                "tnUrl" => $media->tnUrl,
            ]);
        }
        unset($item->areas_seasons);

        return [
            "item" => $item,
            "itemMedia" => $itemMedia,
            "areasSeasons" => $areasSeasons,
        ];
    }
}
