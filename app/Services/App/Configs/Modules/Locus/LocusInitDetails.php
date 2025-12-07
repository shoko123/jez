<?php

namespace App\Services\App\Configs\Modules\Locus;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class LocusInitDetails implements ModuleInitDetailsInterface
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
            "This module documents the loci found in the dig.",
        ];
    }

    public static function categories(): array
    {
        return [
            'Registration' => [
                'Area',
                'Season',
                'Media',
                'Square',
                'Clean'
            ],
            // 'Search' => [
            //     'Search Description',
            // ],
            'Order By' => [
                'Order By',
            ],
        ];
    }
}


class OLDLocusInitDetails implements ModuleInitDetailsInterface
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
            'items_per_page' => (object)['Gallery' => 36, 'Tabular' => 50, 'Chips' => 100]
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
