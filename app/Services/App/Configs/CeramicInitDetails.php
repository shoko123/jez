<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class CeramicInitDetails implements InitDetailsInterface
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
            'This module displays the indicative pottery excavated by the Jezreel Expedition organized by locus and basket. 
            The pottery assemblage also includes ceramic artifacts like figurines, andirons, and spindle whorls.'
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
