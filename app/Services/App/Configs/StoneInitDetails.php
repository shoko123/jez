<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class StoneInitDetails implements InitDetailsInterface
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
            'This module displays the large and diverse collection of stone artifacts found at the site.
            While most are ground stone tools, this assemblage also includes small finds like slingstones, scaraboid seals, and tesserae and larger finds like standing stones and architectural fragments.',
        ];
    }

    public static function categories(): array
    {
        return [
            'Registration' => [
                'Season',
                'Area',
                'Registration Code',
                'Media',
            ],
            'Search' => [
                'Search-ID',
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
            'Basic Characteristics' => [
                'Material',
                'Life-Stage',
                'Morphology',
                'Use-Wear',
                'Profile',
                'Production',
                'Primary Classification',
            ],
            'Typology' => [
                'Type-Passive',
                'Type-Active',
                'Vessel-Part',
                'Vessel-Base',
                'Vessel-Wall',
                'Vessel-Rim',
                'Type-Non-Processor',
            ],
            'Order By' => [
                'Order By',
            ],
        ];
    }
}
