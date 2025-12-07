<?php

namespace App\Services\App\Configs\Modules\Ceramic;

use App\Services\App\Configs\Common\CommonToFinds;

class CeramicGroups
{
    public static function getGroups(): array
    {
        return [
            'Season' => CommonToFinds::getFindSeasonGroup(),
            'Area' =>  CommonToFinds::getFindAreaGroup(),
            'Registration Code' => [
                'code' => 'EM',
                'fieldOrSubfield' => ['name' => 'id', 'start' => 6, 'length' => 2, 'options' => ['PT', 'AR']],
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'primary_classification_id',
                'lookup_table_name' => 'ceramic_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Specialist' => [
                'code' => 'EM',
                'fieldOrSubfield' => 'specialist',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Includes Date' => [
                'code' => 'CT',
                'option_labels'  => ['Yes',  'No']
            ],
            'Search Periods' => [
                'code' => 'SF',
                'field_name' => 'periods',
                'options' => [],
            ],
            'Search Specialist-Description' => [
                'code' => 'SF',
                'field_name' => 'specialist_description',
                'options' => [],
            ],
            'Ware Coarseness' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Ware Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Ware Temper' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Grit Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],

            'Life Stage' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Production' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Vessel Typology' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel/Part']],
            ],
            'Vessel Part' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Vessel/Part']],
            ],
            'Vessel Base' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel Part:Base']],
            ],

            'Foot' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel Part:Foot']],
            ],
            'Rim' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel Part:Rim']],
            ],
            'Handle' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Vessel Part:Handle']],
            ],
            'Artifact Typology' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Ceramic Artifact']],
            ],
            'Architectural/Installation Typology' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Classification:Architectural/Installation']],
            ],
            //// 
            'Plastic' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Flat' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Slip Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Flat:Slip']],
            ],
            'Paint Color' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Flat:Paint']],
            ],
            'Paint/Slip Pattern' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Flat:Paint', 'Flat:Slip']],
            ],
            'Named Groups' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Order By' =>  [
                'code' => 'OB',
            ]
        ];
    }
}
