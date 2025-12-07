<?php

namespace App\Services\App\Configs\Modules\Fauna;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class FaunaInitDetails implements ModuleInitDetailsInterface
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
                'Order By'
            ],
            "Basic Characteristics" => [
                'Primary Taxa',
                'Fauna Scope',
                'Material'
            ],
            "Taxa" => [
                'Mammal Taxa',
                'Bird Taxa'
            ],
            "Integumentary" => [
                'Integumentary Material'
            ],
            "Bone" => [
                'Common Bone',
                'Mammal Bone',
                'Bird Bone'
            ],
            "Bone Charactaristics" => [
                'Symmetry',
                'Fusion',
                'Breakage',
                'Weathering'
            ],
            'Measurements' => [
                'Measurements',
            ],
            'Search' => [
                'Taxa',
                'Bone'
            ],
        ];
    }
}
