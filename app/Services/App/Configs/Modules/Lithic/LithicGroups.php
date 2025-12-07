<?php

namespace App\Services\App\Configs\Modules\Lithic;

use App\Services\App\Configs\Common\CommonToFinds;

class LithicGroups
{
    public static function getGroups(): array
    {
        return [
            'Season' => CommonToFinds::getFindSeasonGroup(),
            'Area' =>  CommonToFinds::getFindAreaGroup(),
            'Registration Code' => [
                'code' => 'EM',
                'fieldOrSubfield' => ['name' => 'id', 'start' => 6, 'length' => 2, 'options' => ['FL', 'AR']],
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Types' => [
                'code' => 'ON',
                'dependency' => [],
                'showAsTag' => false,
            ],
            'Order By' =>  [
                'code' => 'OB',
            ]
        ];
    }
}
