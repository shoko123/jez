<?php

namespace App\Traits;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait MediaTrait
{
    public function primaryMedia($media)
    {
        if (empty($media)) {
            return (object) ["status" => "no_media"];
        } else {
            $med = null;
            $key = array_search('drawing', array_column($media, 'collection_name'));
            if ($key === false) {
                $med = new Media($media[0]);             
            } else {
                $med = new Media($media[$key]);
            }
            return (object) [
                'fullUrl' => $med->getFullUrl(),//$fullUrl,
                'tnUrl' => $med->getFullUrl('tn'),//$tnUrl,
                'status' => 'ready',
            ];
        }
    }

    public function itemMediaCollection($media)
    {
        //get all related media       
        $itemMedia = [];
        foreach ($media as $mediaItem) {
            $med = new Media($mediaItem);
            array_push($itemMedia, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'status' => 'ready', 'media_id' => $med->id]);
        }
        return $itemMedia;
    }
}
