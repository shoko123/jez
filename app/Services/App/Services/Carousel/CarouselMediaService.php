<?php

namespace App\Services\App\Services\Carousel;

use App\Services\App\Services\MediaService;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CarouselMediaService
{
    public static function show(string $id)
    {
        $media = Media::findOrFail($id);

        return array_merge(
            MediaService::format_media_item($media),
            [
                'size' => $media->size,
                'collection_name' => $media->collection_name,
                'file_name' => $media->file_name,
            ]
        );
    }
}
