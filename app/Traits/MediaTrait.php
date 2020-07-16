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

    public function primaryMedia($item)
    {
        $drawing = $item->getFirstMedia('drawing');

        if (!empty($drawing)) {
            return (object) [
                'status' => 'ready',
                'fullUrl' => $drawing->getFullUrl(),
                'tnUrl' => $drawing->getFullUrl(),
            ];
        } else {
            $photo = $item->getFirstMedia('photo');
            if (!empty($photo)) {
                return (object) [
                    'status' => 'ready',
                    'fullUrl' => $photo->getFullUrl(),
                    'tnUrl' => $photo->getFullUrl('tn'),
                ];
            } else {
                //construct filler images
                $reflect = new \ReflectionClass($item);
                $modelName = $reflect->getShortName();
                $fullMediaName = 'fillers/' . $modelName . '0.jpg';
                $tnMediaName = 'fillers/' . $modelName . '0-tn.jpg';
                $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
                $tnUrl = \Storage::disk('app-media')->url($tnMediaName);
                return (object) [
                    'status' => 'no_media',
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                ];
            }
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

    public function itemMediaCollectionOld($media)
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
