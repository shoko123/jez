<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class GlassInitDetails implements InitDetailsInterface
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
            'This module displays the glass artifacts found at the site.',
        ];
    }

    public static function categories(): array
    {
        return [
            'Registration' => [
                'Season',
                'Area',
                'Media',
                'Order By'
            ],
            "Charactaristics" => [
                'Color',
                'Production',
                'Weathering',
                'Weathering-Type'
            ],
            "Typology" => [
                'Primary Classification',
                'Vessel-Subtype'
            ],
            'Periods' => [
                'Periods',
                'Neolithic Subperiods',
                'Bronze Subperiods',
                'Iron Subperiods',
                'Hellenistic Subperiods',
                'Roman Subperiods',
                'Early-Islamic Subperiods',
                'Medieval Subperiods',
                'Modern Subperiods',
            ],
        ];
    }
}
