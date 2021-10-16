<?php
namespace App\Models\Dig;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\BaseDigModel;

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

    public function show($id)
    {   
        $item = $this->with(['media', 'areas_seasons'])->findOrFail($id);

        //get related media.
        $itemMedia = $this->allMedia($item);

        $item["hasMedia"] = $itemMedia->primary->hasMedia;
        $item["tnUrl"] = $itemMedia->primary->tnUrl;
        $item["fullUrl"] = $itemMedia->primary->fullUrl;
        unset($itemMedia->primary);
        unset($item->media);
        $item->tag = $item->season + 2000;

        //format related areas
        $areasSeasons = [];

        foreach ($item->areas_seasons as $index => $as) {

            $media = $this->primaryMedia($as);

            array_push($areasSeasons, [
                "id" => $as->id,
                "description" => $as->description,
                "tag" => $as->tag,
                "fullUrl" => $media->fullUrl,
                "hasMedia" => $media->hasMedia,
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
