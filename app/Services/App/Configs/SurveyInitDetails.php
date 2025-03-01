<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class SurveyInitDetails implements InitDetailsInterface
{
    public static function displayOptions(): array
    {
        return [
            'item_views' => ['Form', 'All', 'Media', 'Related'],
            'collection_views' => (object)[
                'main' => ['Gallery', 'Tabular', 'Chips'],
                'related' => ['Gallery', 'Tabular', 'Chips'],
                'media' => ['Gallery'],
            ],
            'items_per_page' => ['Gallery' => 36, 'Tabular' => 50, 'Chips' => 100]
        ];
    }

    public static function welcomeText(): array
    {
        return [
            "This module describes the features documented in the survey season of summer 2012.",
        ];
    }

    public static function categories(): array
    {
        return [
            'Registration' => [
                'Area',
                'Media'
            ],
            'Search' => [
                'Search Description',
            ],
            'Order By' => [
                'Order By',
            ],
        ];
    }
}
