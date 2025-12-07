<?php

namespace App\Services\App\Configs\Modules\Stone;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class StoneInitDetails implements ModuleInitDetailsInterface
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
                'Registration Code',
                'Registration Scope',
                'Media',
                // 'Square',
                // 'Clean'
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

            ],
            'Typology' => [
                'Primary Classification',
                'Type-Passive',
                'Type-Active',
                'Vessel-Part',
                'Vessel-Base',
                'Vessel-Wall',
                'Vessel-Rim',
                'Type-Non-Processor',
            ],
            'Measurements' => [
                'General Measurements',
            ],
            'Order By' => [
                'Order By',
            ],
        ];
    }
}
