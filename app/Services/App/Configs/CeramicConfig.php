<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\SmallFindTrait;

class CeramicConfig  implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'locus_id' => 'required|exists:loci,id',
            'code' => 'required|in:PT,AR',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:0,99',
            'date_retrieved' => 'date|nullable',
            'field_description' => 'max:400',
            'field_notes' => 'max:400',
            'square' => 'max:20',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            //
            'specialist' => 'required|in:Unassigned,Tamar Shooval and Danny Rosenberg,Eliot Braun,Estelle Orrelle',
            'specialist_description' => 'max:400',
            'periods' => 'max:250',
            'primary_classification_id' => 'required|exists:ceramic_primary_classifications,id',
        ];
    }

    public static function showQuery(): array
    {
        return ['select' => ['description']];
    }

    public static function showFormat(DigModuleModel $model): array
    {
        return $model->description;
    }

    public static function shortQuery(): array
    {
        return ['select' => ['periods']];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->periods ?? '[No periods description]';
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'date_retrieved',
                'field_description',
                'field_notes',
                'specialist_description',
                'periods'
            ],
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Date Retrieved' => $r->date_retrieved,
            'Field Description' => $r->field_description,
            'Field Notes' => $r->field_notes,
            'Specialist Description' => $r->specialist_description,
            'Periods ' => $r->periods
        ];
    }

    public static function dateFields(): array
    {
        return ['date_retrieved'];
    }

    public static function groups(): array
    {
        return [
            'Registration Code' => [
                'code' => 'EM',
                'field_name' => 'code',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Primary Classification' => [
                'code' => 'LV',
                'field_name' => 'primary_classification_id',
                'lookup_table_name' => 'ceramic_primary_classifications',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Registration Scope:Artifact']],
            ],
            'Specialist' => [
                'code' => 'EM',
                'field_name' => 'specialist',
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
            'Order By' => [
                'code' => 'OB',
                'options' => static::smallFindOrderByOptions(true)
            ]
        ];
    }

    // Filters groups/fields
    public static function allowed_categorized_filter_group_names(): array
    {
        return ['Registration Scope', 'Specialist', 'Includes Date'];
    }

    public static function allowed_search_field_names(): array
    {
        return ['periods', 'specialist_description'];
    }

    public static function discreteFilterOptions(): array
    {
        return array_merge(static::smallFindDiscreteFilterOptions(true), [
            'Primary Classification' => 'primary_classification_id',
            'Specialist' => 'specialist',
        ]);
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        foreach ($groups as $key => $group) {
            switch ($group['group_name']) {
                case 'Registration Scope':
                    $builder =  static::filterScope($builder, $group['selected']);
                    break;

                case 'Includes Date':
                    $builder = static::filterIncludesDate($builder, $group['selected']);
                    break;
                default:
                    // Throw exception
            }
            return $builder;
        }
    }

    private static function filterScope(Builder $builder, array $vals): Builder
    {
        if (count($vals) !== 1) {
            return $builder;
        }

        $builder->Where(function ($query) use ($vals) {
            if ($vals[0]['name'] === 'Basket') {
                $query->where('artifact_no', 0);
            } else {
                $query->Where('artifact_no', '!=', 0);
            }
        });

        return $builder;
    }

    private static function filterIncludesDate(Builder $builder, array $vals): Builder
    {
        if (count($vals) !== 1) {
            return $builder;
        }

        $builder->Where(function ($query) use ($vals) {
            if (
                $vals[0]['name'] === 'Yes'
            ) {
                $query->whereNotNull('date_retrieved');
            } else {
                $query->WhereNull('date_retrieved');
            }
        });

        return $builder;
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    public static function allowed_tagger_field_names(): array
    {
        return ['primary_classification_id'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }

    // Tagger
}
