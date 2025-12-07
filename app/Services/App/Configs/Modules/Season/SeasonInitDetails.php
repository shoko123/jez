<?php

namespace App\Services\App\Configs\Modules\Season;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class SeasonInitDetails implements ModuleInitDetailsInterface
{
    public static function displayOptions(): array
    {
        return [
            'item_views' => ['All', 'Form', 'Media', 'Related'],
            'collections_views_and_page_lengths' => [
                'main' => [['Gallery', 36], ['Tabular', 100], ['Chips', 100]],
                'related' =>  [['Gallery', 18], ['Tabular', 20], ['Chips', 100]],
                'media' => [['Gallery', 36]],
            ],
        ];
    }

    public static function welcomeText(): array
    {
        return [
            "This module describes the Seasons",
        ];
    }

    public static function categories(): array
    {
        return  [
            'Registration' => [
                'Order By',
            ]
        ];
    }
}
