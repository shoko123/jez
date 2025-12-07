<?php

namespace App\Services\App\Configs\Modules\Survey;

class SurveyGroups
{
    public static function getGroups(): array
    {
        return [
            'Area' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'area_id',
                'lookup_table_name' => 'areas',
                'lookup_text_field' => 'id',
                'lookup_order_by_field' => 'id',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Search Description' => [
                'code' => 'SF',
                'field_name' => 'description',
            ],
            'Order By' =>  [
                'code' => 'OB',
            ]
        ];
    }
}
