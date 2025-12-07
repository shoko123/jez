<?php

namespace App\Services\App\Configs\Modules\Glass;

use App\Services\App\Configs\Common\CommonToFinds;

class GlassGroups
{
    public static function getGroups(): array
    {
        return [
            'Season' => CommonToFinds::getFindSeasonGroup(),
            'Area' =>  CommonToFinds::getFindAreaGroup(),
            'Registration Code' => [
                'code' => 'EM',
                'fieldOrSubfield' => ['name' => 'id', 'start' => 6, 'length' => 2, 'options' => ['AR']],
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'primary_classification_id',
                'lookup_table_name' => 'glass_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Production' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Vessel-Subtype' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel/Lamp']],
            ],
            'Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Weathering' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Weathering-Type' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Order By' => [
                'code' => 'OB',
            ]
        ];
    }
}
