<?php

namespace App\Services\App\Configs;

use App\Services\App\Interfaces\InitDetailsInterface;

class FaunaInitDetails implements InitDetailsInterface
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
            'This module displays the fauna remains recovered from the site.',
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
