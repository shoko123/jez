<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\SmallFindTrait;
use App\Services\App\Services\MediaService;
use App\Services\App\Services\TagService;

class FaunaConfig  implements ConfigInterface
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

    public static function specialFields(): array
    {
        return [
            'dates' => ['date_retrieved'],
            'lookupVals' => ['primary_taxon_id', 'scope_id', 'material_id'],
            'onps' => true
        ];
    }

    public static function showQuery(): array
    {
        return [
            'with' => [
                'module_tags.tag_group',
                'global_tags.tag_group',
                'media' => function ($query) {
                    $query->orderBy('order_column');
                },
                'onps'
            ]
        ];
    }

    public static function showFormat(DigModuleModel $m): array
    {
        return [
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags', 'onps']),
            'media' => MediaService::format_media_collection($m->media),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => $m->onps->map(function ($onp, int $key) {
                return ['group_label' => $onp->group_label, 'label' => $onp->label, 'value' => $onp->pivot->value, 'shift' => $onp->shift];
            })
        ];
    }

    public static function shortQuery(): array
    {
        return ['select' => ['taxa']];
    }

    public static function shortFormat(DigModuleModel $r): string
    {
        return $r->taxa ?? '[No taxa description given]';
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'taxa',
                'bone',
                'primary_taxon_id',
                'scope_id',
                'material_id'
            ],
            'with' => [
                'primaryTaxon',
                'scope',
                'material',
            ],
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Taxa' => $r->taxa,
            'Bone' => $r->bone,
            'Primary Taxon' => $r->primaryTaxon->name,
            'Scope' => $r->scope->name,
            'Material' => $r->material->name,
        ];
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
        }
        return $builder;
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
