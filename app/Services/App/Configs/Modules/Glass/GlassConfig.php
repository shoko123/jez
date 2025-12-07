<?php

namespace App\Services\App\Configs\Modules\Glass;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Glass\GlassGroups;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class GlassConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'glass_tags', 'onps' => null];
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
            'primary_classification_id' => [
                'LV',
                ['groupName' => 'Primary Classification', 'default' => 'Unassigned']
            ],
            'specialist_description' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
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
        return Str::substr($m->specialist_description, 0, 200);
    }

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
            'Specialist Description' => $m->specialist_description,
        ];
    }

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
        return GlassGroups::getGroups();
    }
}
