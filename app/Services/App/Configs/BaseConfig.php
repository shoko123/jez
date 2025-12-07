<?php

namespace App\Services\App\Configs;

use App\Services\App\Services\MediaService;
use Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection;

class BaseConfig
{
    public static function withMedia($all = false)
    {
        if ($all) {
            return  ['media' => function ($query) {
                $query->orderBy('order_column');
            }];
        } else {
            return  ['media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            }];
        }
    }

    public static function getMediaArrayAndPage(MediaCollection $mc, int $mediaPageLength): array
    {
        $media_ids = [];
        $media_page = [];

        $mc->each(function ($item, $key) use ($mediaPageLength, &$media_page, &$media_ids) {
            array_push($media_ids, $item['id']);
            if ($key < $mediaPageLength) {
                array_push($media_page, MediaService::format_media_item($item));
            }
        });

        return [
            'media_array' => $media_ids,
            'media_page' =>  $media_page,
        ];
    }
}
