<?php

namespace App\Services\App\Configs\Modules\Lithic;

use App\Services\App\Configs\ModuleInitDetailsInterface;

class LithicInitDetails implements ModuleInitDetailsInterface
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
                'Season',
                'Area',
                'Registration Code',
                'Registration Scope',
                'Media',
                'Order By',
            ],
            "Typology" => [
                'Types',
            ],
        ];
    }
}
