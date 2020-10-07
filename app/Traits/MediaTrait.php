<?php

namespace App\Traits;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait MediaTrait
{
    public function primaryMedia($modelName, $item)
    {
        $drawing = $item->getFirstMedia('drawing');

        if (!empty($drawing)) {
            return (object) [
                'hasMedia' => TRUE,
                'fullUrl' => $drawing->getFullUrl(),
                'tnUrl' => $drawing->getFullUrl(),
            ];
        } else {
            $photo = $item->getFirstMedia('photo');
            if (!empty($photo)) {
                return (object) [
                    'hasMedia' => TRUE,
                    'fullUrl' => $photo->getFullUrl(),
                    'tnUrl' => $photo->getFullUrl('tn'),
                ];
            } else {
                //construct filler images
                $fullMediaName = 'fillers/' . $modelName . '0.jpg';
                $tnMediaName = 'fillers/' . $modelName . '0-tn.jpg';
                $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
                $tnUrl = \Storage::disk('app-media')->url($tnMediaName);
                return (object) [
                    'hasMedia' => FALSE,
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                ];
            }
        }
    }

    public function itemMediaCollection($modelName, $item)
    {
        $itemMedia = (object) ["collection" => [], "filler" => null];
        $drawings = $item->getMedia('drawing');

        foreach ($drawings as $med) {
            array_push($itemMedia->collection, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => TRUE, 'media_id' => $med->id]);
        }

        $photos = $item->getMedia('photo');

        foreach ($photos as $med) {
            array_push($itemMedia->collection, ['fullUrl' => $med->getFullUrl(), 'tnUrl' => $med->getFullUrl('tn'), 'hasMedia' => TRUE, 'media_id' => $med->id]);
        }
        if (empty($itemMedia->collection)) {
            //construct filler images urls
            $fullMediaName = 'fillers/' . $modelName . '0.jpg';
            $tnMediaName = 'fillers/' . $modelName . '0-tn.jpg';
            $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
            $tnUrl = \Storage::disk('app-media')->url($tnMediaName);
            $itemMedia->filler = (object) [
                'hasMedia' => FALSE,
                'fullUrl' => $fullUrl,
                'tnUrl' => $tnUrl,
            ];
            $itemMedia->collection = [];
        } else {
            $itemMedia->filler = null;
        }
        return $itemMedia;
    }
}
