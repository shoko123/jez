<?php

namespace App\Services\App\Module\Specific\Lithic;

use App\Services\App\Module\InitDetailsInterface;

class LithicInitDetails implements InitDetailsInterface
{
    public static function displayOptions(): array
    {
        return [
            'item_views' => ['Main', 'Media', 'Related'],
            'collection_views' => (object)[
                'main' => ['Tabular', 'Gallery', 'Chips'],
                'related' => ['Gallery', 'Tabular', 'Chips'],
                'media' => ['Gallery'],
            ],
            'items_per_page' => ['Gallery' => 36, 'Tabular' => 50, 'Chips' => 100]
        ];
    }

    public static function welcomeText(): array
    {
        return [
            'This module displays the chipped and flaked stone tools found by the Jezreel Expedition.',
        ];
    }

    public static function modelGroups(): array
    {
        return [
            'Registration Code' => [
                'code' => 'EM',
                'field_name' => 'code',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Typology' => [
                'code' => 'ON',
                'field_name' => 'group_label',
                'group_name' => 'Count'
            ],
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
            "Types" => [
                'Primary Typology',
            ],
        ];
    }
}
