<?php

namespace App\Services\App\Configs\Modules\Fauna;

use App\Services\App\Configs\Common\CommonToFinds;

class FaunaGroups
{
    public static function getGroups(): array
    {
        return [
            'Season' => CommonToFinds::getFindSeasonGroup(),
            'Area' =>  CommonToFinds::getFindAreaGroup(),
            'Registration Code' => [
                'code' => 'EM',
                'fieldOrSubfield' => ['name' => 'id', 'start' => 6, 'length' => 2, 'options' => ['LB']],
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Taxa' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'primary_taxon_id',
                'lookup_table_name' => 'fauna_primary_taxa',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Fauna Scope' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'scope_id',
                'lookup_table_name' => 'fauna_scopes',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Material' => [
                'code' => 'LV',
                'fieldOrSubfield' => 'material_id',
                'lookup_table_name' => 'fauna_materials',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Fauna Scope:Single Item', 'Fauna Scope:Anatomical Cluster', 'Fauna Scope:Skeleton']],
            ],
            'Integumentary Material' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Material:Integumentary']],
            ],
            'Mammal Taxa' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Taxa:Mammal']],
            ],
            'Bird Taxa' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Primary Taxa:Bird']],
            ],
            'Common Bone' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone', 'Material:Bone and Tooth']],
            ],
            'Mammal Bone' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Material:Bone'], ['Primary Taxa:Mammal']],
            ],
            'Bird Bone' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [['Material:Bone'], ['Primary Taxa:Bird']],
            ],
            'Symmetry' => [
                'code' => 'EM',
                'fieldOrSubfield' => 'symmetry',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone']],
            ],
            'Weathering' => [
                'code' => 'EM',
                'fieldOrSubfield' => 'weathering',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone']],
            ],
            'Fusion' => [
                'code' => 'TM',
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone']],
                'multiple' => true,
            ],
            'Breakage' => [
                'code' => 'TM',
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone']],
                'multiple' => true,
            ],

            'Bone-Name' => [
                'code' => 'TM',
                'dependency' => [],
                'multiple' => true,
            ],
            'Tooth-Name' => [
                'code' => 'TM',
                'dependency' => [],
                'multiple' => true,
            ],
            'Measurements' => [
                'code' => 'ON',
                'showAsTag' => false,
                'dependency' => [],
            ],
            ///
            'Taxa' => [
                'code' => 'SF',
                'field_name' => 'taxa',
                'options' => [],
            ],
            'Bone' => [
                'code' => 'SF',
                'field_name' => 'bone',
                'options' => [],
            ],
            'Order By' => [
                'code' => 'OB',
            ]
        ];
    }
}
