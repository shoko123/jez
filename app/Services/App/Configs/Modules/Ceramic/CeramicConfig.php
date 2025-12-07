<?php

namespace App\Services\App\Configs\Modules\Ceramic;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Ceramic\CeramicGroups;
use App\Services\App\Configs\Modules\Ceramic\CeramicRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class CeramicConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'ceramic_tags', 'onps' => null];
    }

    /*
      'id' => 'required|string|min:11|max:11',
        
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
    */
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
            'field_description' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
            ],
            'field_notes' => [
                'STR',
                ['min' => 0, 'max' => 400, 'nullable' => true, 'default' => null]
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
            'primary_classification_id' => [
                'LV',
                ['groupName' => 'Primary Classification']
            ],
            'specialist' => [
                'EM',
                ['groupName' => 'Specialist', 'default' => 'Unassigned']
            ],
            'periods' => [
                'STR',
                ['min' => 0, 'max' => 250, 'nullable' => true, 'default' => null]
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
        return Str::substr($m->description, 0, 200);
    }

    public static function tabularPageQuery(DigModuleModel $m): Builder
    {
        return $m->select('*');
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'tag' => static::tagFormat($r),
            'Date Retrieved' => $r->date_retrieved,
            'Field Description' => $r->field_description,
            'Field Notes' => $r->field_notes,
            'Specialist Description' => $r->specialist_description,
            'Periods ' => $r->periods
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
            'searchFields' => ['periods', 'specialist_description'],
            'discreteFilterGroups' => ['Area', 'Season', 'Registration Code', 'Primary Classification', 'Material', 'Specialist'],
        ];
    }

    public static function groups(): array
    {
        return CeramicGroups::getGroups();
    }
}
