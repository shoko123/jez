<?php

namespace App\Services\App\Configs\Modules\Metal;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Metal\MetalGroups;
use App\Services\App\Configs\Modules\Metal\MetalRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class MetalConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'metal_tags', 'onps' => null];
    }

    public static function fieldsMeta(): array
    {
        /*
    'id' => 'required|string|min:11|max:11',
            'date_retrieved' => 'date|nullable',
            
            'square' => 'max:20',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            //
            'field_description' => 'max:400',
            'specialist_description' => 'max:400',
            'measurements' => 'max:200',
            'material_id' => 'required|exists:metal_materials,id',
            'primary_classification_id' => 'required|exists:metal_primary_classifications,id',
            'specialist' => 'required|in:Unassigned,UE Students',
        */
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
            'square' => [
                'STR',
                ['min' => 0, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'level_top' => [
                'STR',
                ['min' => 0, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'level_bottom' => [
                'STR',
                ['min' => 0, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'field_description' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'specialist_description' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'primary_classification_id' => [
                'LV',
                ['groupName' => 'Primary Classification']
            ],
            'material_id' => [
                'LV',
                ['groupName' => 'Material']
            ],
            //
            'measurements' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'specialist' => [
                'EM',
                ['groupName' => 'Specialist']
            ],

            //

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
        return $m->select('id', 'date_retrieved', 'field_description', 'specialist_description', 'material_id', 'primary_classification_id')
            ->with('material', 'primaryClassification');
    }

    public static function tabularPageFormat(DigModuleModel $m): array
    {
        return [
            'id' => $m->id,
            'tag' => static::tagFormat($m),
            'Date Retrieved' => $m->date_retrieved,
            'Field Description' => $m->field_description,
            'Specialist Description' => $m->specialist_description,
            'Material' => $m->material->name,
            'Primary Classification' => $m->primaryClassification->name,
        ];
    }
    /*
    public static function tabularPageQuery(DigModuleModel $m): Builder
    {
        return $m->select('*');
    }

    public static function tabularPageFormat(DigModuleModel $m): array
    {
        return [
            'id' => $m->id,
            'tag' => static::tagFormat($m),
            'Field Description' => $m->field_description,
            'Field Notes' => $m->field_notes,
            'Description' => $m->description,
            'Notes' => $m->notes,
        ];
    }
        */

    public static function showQuery(DigModuleModel $m): Builder
    {
        return  $m->with(
            BaseConfig::withMedia(true),
            'module_tags.tag_group',
            'global_tags.tag_group',
        );
    }

    public static function showFormat(DigModuleModel $m, int $mediaPageLength): array
    {
        $mediaArrayAndPage = static::getMediaArrayAndPage($m->media, $mediaPageLength);

        return array_merge([
            'tag' => static::tagFormat($m),
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags']),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => [],
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
            'searchFields' => ['description'],
            'discreteFilterGroups' => ['Area', 'Season', 'Registration Code', 'Primary Classification', 'Material'],
        ];
    }

    public static function groups(): array
    {
        return MetalGroups::getGroups();
    }
}
