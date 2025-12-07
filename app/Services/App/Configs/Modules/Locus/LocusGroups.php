<?php

namespace App\Services\App\Configs\Modules\Locus;

class LocusGroups
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
            'Season' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'season_id',
                'manipulator' => function ($val) {
                    return (string) ($val + 2010);
                },
                'lookup_table_name' => 'seasons',
                'lookup_text_field' => 'id',
                'lookup_order_by_field' => 'id',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Square' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Clean' => [
                'code' => 'EM',
                'fieldOrSubfield' => 'clean',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Order By' =>  [
                'code' => 'OB',
            ]
        ];
    }
}
