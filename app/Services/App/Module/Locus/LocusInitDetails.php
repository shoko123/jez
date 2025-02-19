<?php

namespace App\Services\App\Module\Locus;

use App\Services\App\InitDetailsInterface;

class LocusInitDetails  implements InitDetailsInterface
{
    public static function displayOptions(): array
    {
        return [
            'item_views' => ['Main', 'Media', 'Related'],
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
            'This module displays the loci from the six excavation seasons (2013-2018).',
        ];
    }

    public static function categories(): array
    {
        return [
            'Registration' => [
                'Season',
                'Area',
                'Media',
                'Square',
                'Clean'
            ],
            'Search' => [
                'Search Description',
                'Search Deposit',
                'Search Registration Notes',
            ],
            'Order By' => [
                'Order By',
            ],
        ];
    }
}
