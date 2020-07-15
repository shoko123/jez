<?php

namespace App\Traits;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait MediaTrait
{
    public static function theClass()
    {
        $modelNameWithPath = static::class;
        $reflect = new \ReflectionClass($modelNameWithPath);
        return $reflect->getShortName();
    }

    public function primaryMedia($media)
    {

        $fullMediaName = 'fillers/' . $this->theClass() . '0.jpg';
        $tnMediaName = 'fillers/' . $this->theClass() . '0-tn.jpg';

        $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
        $tnUrl = \Storage::disk('app-media')->url($tnMediaName);

        if (empty($media)) {
            return (object) [
                'status' => "no_media",
                'fullUrl' => $fullUrl,
                'tnUrl' => $tnUrl,
            ];
        } else {
            $med = null;
            $key = array_search('drawing', array_column($media, 'collection_name'));
            if ($key === false) {
                $med = new Media($media[0]);
            } else {
                $med = new Media($media[$key]);
            }
            return (object) [
                'status' => 'ready',
                'fullUrl' => $med->getFullUrl(), //$fullUrl,
                'tnUrl' => $med->getFullUrl('tn'), //$tnUrl,
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
