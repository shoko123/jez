<?php

namespace App\Services\App\Configs\Modules\Fauna;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Fauna\FaunaGroups;
use App\Services\App\Configs\Modules\Fauna\FaunaRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class FaunaConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'fauna_tags', 'onps' => 'fauna_onps'];
    }

    public static function fieldsMeta(): array
    {
        return [
            'id' => [
                'STR',
                ['min' => 11, 'max' => 11, 'nullable' => false, 'default' => '']
            ],
            'locus_id' => [
                'STR',
                ['min' => 5, 'max' => 5, 'nullable' => false, 'default' => '']
            ],
            'date_retrieved'  => [
                'DAT',
                ['min' => '2013-05-01', 'max' => '2018-08-30', 'nullable' => true, 'default' => null]
            ],
            'weight' => [
                'INT',
                ['min' => 1, 'max' => 2000, 'nullable' => true, 'default' => null]
            ],
            'field_description' => [
                'STR',
                ['min' => 0, 'max' => 255, 'nullable' => true, 'default' => null]
            ],
            'primary_taxon_id' => [
                'LV',
                ['groupName' => 'Primary Taxa', 'default' => 'Unassigned']
            ],
            'scope_id' => [
                'LV',
                ['groupName' => 'Fauna Scope', 'default' => 'Unassigned']
            ],
            'material_id' => [
                'LV',
                ['groupName' => 'Material', 'default' => 'Unassigned']
            ],
            'taxa' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'bone' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'symmetry' => [
                'EM',
                ['groupName' => 'Symmetry', 'default' => 'Unassigned']
            ],
            'd_and_r' => [
                'STR',
                ['min' => 0, 'max' => 30, 'nullable' => true, 'default' => null]
            ],
            'age' => [
                'STR',
                ['min' => 0, 'max' => 50, 'nullable' => true, 'default' => null]
            ],
            'breakage' => [
                'STR',
                ['min' => 0, 'max' => 50, 'nullable' => true, 'default' => null]
            ],
            'butchery'  => [
                'STR',
                ['min' => 0, 'max' => 100, 'nullable' => true, 'default' => null]
            ],
            'burning'  => [
                'STR',
                ['min' => 0, 'max' => 100, 'nullable' => true, 'default' => null]
            ],
            'weathering'  => [
                'EM',
                ['groupName' => 'Weathering', 'default' => 'Unassigned']
            ],
            'other_bsm'  => [
                'STR',
                ['min' => 0, 'max' => 200, 'nullable' => true, 'default' => null]
            ],
            'specialist_notes'  => [
                'STR',
                ['min' => 0, 'max' => 200, 'nullable' => true, 'default' => null]
            ],
            'measured'  => [
                'STR',
                ['min' => 1, 'max' => 1, 'nullable' => true, 'default' => null]
            ],
        ];
    }

    public static function validateItem(array $m): array
    {
        return CommonToFinds::validateFindIdConsistency($m);
    }

    public static function indexQuery(DigModuleModel $m): Builder
    {
        return $m->select('id');
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        foreach ($groups as $key => $group) {
            switch ($group['group_name']) {
                case 'Registration Scope':
                    return CommonToFinds::filterScope($builder, $group['selected']);
                    break;

                default:
                    // Throw exception
            }
        }
        return $builder;
    }

    public static function tagQuery(DigModuleModel $m): Builder
    {
        return CommonToFinds::tagQuery($m);
    }

    public static function tagFormat(DigModuleModel $m): string
    {
        return CommonToFinds::tagFormat($m);
    }

    public static function idTagShortMedia1Query(DigModuleModel $m): Builder
    {
        return $m->select('*')
            ->with(BaseConfig::withMedia());
    }

    public static function shortFormat(DigModuleModel $m): string
    {
        return Str::substr($m->description, 0, 200);
    }

    public static function tabularPageQuery(DigModuleModel $m): Builder
    {
        return $m->select(
            'id',
            'taxa',
            'bone',
            'primary_taxon_id',
            'scope_id',
            'material_id'
        )->with(
            [
                'primaryTaxon',
                'scope',
                'material',
            ]
        );
    }

    public static function tabularPageFormat(DigModuleModel $m): array
    {
        return [
            'id' => $m->id,
            'tag' => static::tagFormat($m),
            'Scope' => $m->scope->name,
            'Material' => $m->material->name,
            'Bone/Tooth' => $m->bone,
            'Primary Taxon' => $m->primaryTaxon->name,
            'Taxa' => $m->taxa,
        ];
    }

    public static function showQuery(DigModuleModel $m): Builder
    {
        return  $m->with(
            BaseConfig::withMedia(true),
            'module_tags.tag_group',
            'global_tags.tag_group',
            'onps'
        );
    }

    public static function showFormat(DigModuleModel $m, int $mediaPageLength): array
    {
        $mediaArrayAndPage = static::getMediaArrayAndPage($m->media, $mediaPageLength);

        return array_merge([
            'tag' => static::tagFormat($m),
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags', 'onps']),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => $m->onps->map(function ($onp, int $key) {
                return ['group_label' => $onp->group_label, 'label' => $onp->label, 'value' => $onp->pivot->value, 'shift' => $onp->shift];
            })
        ], $mediaArrayAndPage);
    }

    public static function orderByDefs(): array
    {
        return CommonToFinds::orderByDefs();
    }

    public static function validations(): array
    {
        return [
            'taggerFields' => [],
            'categorizedGroups' => ['Registration Scope'],
            'searchFields' => ['taxa', 'bone'],
            'discreteFilterGroups' => ['Area', 'Season', 'Registration Code', 'Primary Taxa', 'Fauna Scope', 'Material', 'symmetry', 'weathering'],
        ];
    }

    public static function groups(): array
    {
        return FaunaGroups::getGroups();
    }
}
