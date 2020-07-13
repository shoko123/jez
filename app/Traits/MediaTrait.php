<?php

namespace App\Traits;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait MediaTrait
{
    /**
     * add filtering.
     *
     * @param  $builder: query builder.
     * @param  $filters: array of filters.
     * @return query builder.
     */
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
}
