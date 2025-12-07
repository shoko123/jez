<?php

namespace App\Services\App\Configs\Modules\Stone;

use App\Services\App\Configs\Common\CommonToFinds;

class StoneGroups
{
    public static function getGroups(): array
    {
        return [
            'Season' => CommonToFinds::getFindSeasonGroup(),
            'Area' =>  CommonToFinds::getFindAreaGroup(),
            'Registration Code' => [
                'code' => 'EM',
                'fieldOrSubfield' => ['name' => 'id', 'start' => 6, 'length' => 2, 'options' => ['GS', 'AR']],
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'primary_classification_id',
                'lookup_table_name' => 'stone_primary_classifications',
                'lookup_text_field' => 'name',
                'lookup_order_by_field' => 'id',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Material' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'material_id',
                'lookup_table_name' => 'stone_materials',
                'lookup_text_field' => 'name',
                'lookup_order_by_field' => 'id',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Life-Stage' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Morphology' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Profile' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Production' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Use-Wear' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Type-Passive' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Passive']],
            ],
            'Type-Active' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Active (handheld)']],
            ],
            // 'Vessel Types' => [
            //     'code' => 'TM',
            //     'multiple' => true,            
            //     'dependency' => ['Basic Typology:Vessel'],
            // ],
            'Vessel-Part' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel']],
            ],
            'Vessel-Base' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel-Part:Base']],
            ],
            'Vessel-Wall' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel-Part:Wall']],
            ],
            'Vessel-Rim' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel-Part:Rim']],
            ],
            'Type-Non-Processor' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Non-Processor']],
            ],
            'Search-ID' => [
                'label' => 'Search-ID',
                'code' => 'SF',
                'field_name' => 'id',
            ],
            'General Measurements' => [
                'code' => 'ON',
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Order By' =>  [
                'code' => 'OB',
            ]
        ];
    }
}
