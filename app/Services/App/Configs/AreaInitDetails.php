<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class AreaInitDetails implements InitDetailsInterface
{
    public static function displayOptions(): array
    {
        return [
            'item_views' => ['Form', 'All', 'Media', 'Related'],
            'collection_views' => (object)[
                'main' => ['Gallery', 'Tabular', 'Chips'],
                'related' => ['Tabular', 'Gallery', 'Chips'],
                'media' => ['Gallery'],
            ],
            'items_per_page' => (object)['Gallery' => 36, 'Tabular' => 50, 'Chips' => 100]
        ];
    }

    public static function welcomeText(): array
    {
        return [
            "This module describes the areas surveyed or excavated by the Jezreel Expedition 2012-2018.",
        ];
    }

    public static function categories(): array
    {
        return [];
    }
}
