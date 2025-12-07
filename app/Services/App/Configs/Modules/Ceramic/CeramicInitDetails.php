<?php

namespace App\Services\App\Configs\Modules\Ceramic;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class CeramicInitDetails implements ModuleInitDetailsInterface
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
                'Registration Code',
                'Registration Scope',
                'Season',
                'Area',
                'Media',
                'Includes Date',
                'Order By',
            ],
            "Typology" => [
                'Primary Classification',
            ],
            "Vessel Typology" => [
                'Vessel Typology',
                'Vessel Part',
                'Vessel Base',
                'Foot',
                'Rim',
                'Handle',
            ],
            "Artifact Typology" => [
                'Artifact Typology',
            ],
            "Architectural/Installation Typology" => [
                'Architectural/Installation Typology'
            ],
            "Ware" => [
                'Ware Coarseness',
                'Ware Color',
                'Ware Temper',
                'Grit Color',
            ],
            'Processes' => [
                'Production',
                'Life Stage',
            ],
            'Surface Treatment' => [
                'Plastic',
                'Flat',
                'Slip Color',
                'Paint Color',
                'Paint/Slip Pattern',
            ],
            'Cultures/Periods' => [
                'Named Groups',
                'Periods',
                'Neolithic Subperiods',
                'Bronze Subperiods',
                'Iron Subperiods',
                'Hellenistic Subperiods',
                'Roman Subperiods',
                'Early-Islamic Subperiods',
                'Medieval Subperiods',
                'Modern Subperiods'
            ],
            'Search Text' => [
                'Search Periods',
                'Search Specialist-Description',
            ],
            'Processing' => [
                'Specialist',
            ],
        ];
    }
}
