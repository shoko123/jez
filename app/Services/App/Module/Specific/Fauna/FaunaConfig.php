<?php

namespace App\Services\App\Module\Specific\Fauna;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\SmallFind\SmallFindTrait;

class FaunaConfig implements ConfigInterface
{
    use SmallFindTrait;

    public static function fieldsValidation(): array
    {
        return [
            'id' => 'required|string|min:11|max:11',
            'locus_id' => 'required|exists:loci,id',
            'code' => 'required|in:AR,LB',
            'basket_no' => 'required|numeric|between:0,99',
            'artifact_no' => 'required|numeric|between:0,99',
            'date_retrieved' => 'date|nullable',
            'weight' => 'numeric|between:1,2000|nullable',
            'field_description' => 'max:255',
            //
            'primary_taxon_id' => 'required|exists:fauna_primary_taxa,id',
            'scope_id' => 'required|exists:fauna_scopes,id',
            'material_id' => 'required|exists:fauna_materials,id',
            //
            'taxa' => 'max:400',
            'bone' => 'max:400',
            'symmetry' => 'required|in:Unassigned,Irrelevant,Unknown,Left,Right',
            'd_and_r' => 'max:30',
            'age' => 'max:50',
            'breakage' => 'max:50',
            'butchery' => 'max:100',
            'burning' => 'max:100',
            'weathering' => 'required|in:Unassigned,0,1,2,3,4,5',
            'other_bsm' => 'max:200',
            'specialist_notes' => 'max:200',
            'measured' => 'max:1',
            'data.onps' => 'array',
            'data.onps.*.id' => 'required|exists:fauna_onps,id',
            'data.onps.*.value' => 'required|numeric|between:10,32767',
        ];
    }

    public static function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['taxa'] ?? '[No description]'
        );
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
            'Primary Taxa' => [
                'code' => 'LV',
                'field_name' => 'primary_taxon_id',
                'lookup_table_name' => 'fauna_primary_taxa',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Fauna Scope' => [
                'code' => 'LV',
                'field_name' => 'scope_id',
                'lookup_table_name' => 'fauna_scopes',
                'lookup_text_field' => 'name',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [],
            ],
            'Material' => [
                'code' => 'LV',
                'field_name' => 'material_id',
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
                'field_name' => 'symmetry',
                'useInTagger' => true,
                'showAsTag' => true,
                'dependency' => [['Fauna Scope:Single Item'], ['Material:Bone']],
            ],
            'Weathering' => [
                'code' => 'EM',
                'field_name' => 'weathering',
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
                'field_name' => 'group_label',
                'group_name' => 'Measurements'
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
                'options' => static::smallFindOrderByOptions(true)
            ]
        ];
    }

    // Filters groups/fields
    public static function discreteFilterOptions(): array
    {
        return array_merge(static::smallFindDiscreteFilterOptions(true), [
            'Taxa' => 'primary_taxon_id',
            'Primary Taxa' => 'primary_taxon_id',
            'Fauna Scope' => 'scope_id',
            'Material' => 'material_id',
            'Symmetry' => 'symmetry',
        ]);
    }

    public static function allowed_categorized_filter_group_names(): array
    {
        return ['Registration Scope'];
    }

    public static function allowed_search_field_names(): array
    {
        return ['taxa', 'bone'];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        foreach ($groups as $key => $group) {
            switch ($group['group_name']) {
                case 'Registration Scope':
                    $builder =  static::filterScope($builder, $group['selected']);
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

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    // Pages
    public static function tabularPage(): array
    {
        return [
            'fields' => [
                'id',
                'taxa',
                'bone',
            ],
            'lookups' => [
                'primary_taxon_id' => 'primaryTaxon',
                'scope_id' => 'scope',
                'material_id' => 'material',
            ]
        ];
    }

    public static function galleryPage(): array
    {
        return ['id', 'taxa'];
    }

    public static function allowed_tagger_field_names(): array
    {
        return ['primary_taxon_id', 'scope_id', 'material_id', 'symmetry', 'weathering'];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return static::smallFindRelatedModules(substr($id, 0, 5));
    }

    // Tagger
}
