<?php

namespace App\Services\App\Configs\Modules\Metal;

use App\Services\App\Configs\Common\CommonToFinds;

class MetalGroups
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
            'Material' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'material_id',
                'lookup_table_name' => 'metal_materials',
                'lookup_text_field' => 'name',
                'lookup_order_by_field' => 'id',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'primary_classification_id',
                'lookup_table_name' => 'metal_primary_classifications',
                'lookup_text_field' => 'name',
                'lookup_order_by_field' => 'id',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Specialist' => [
                'code' => 'EM',
                'fieldOrSubfield' => 'specialist',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Modern Weaponry' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Modern Weaponry']],
            ],
            'Field Description' => [
                'code' => 'SF',
                'field_name' => 'field_description',
            ],
            'Specialist Description' => [
                'code' => 'SF',
                'field_name' => 'specialist_description',
            ],
            'Order By' => [
                'code' => 'OB',
            ]
        ];
    }
}
