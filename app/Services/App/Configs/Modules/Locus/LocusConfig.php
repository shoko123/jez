<?php

namespace App\Services\App\Configs\Modules\Locus;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Locus\LocusGroups;
use App\Services\App\Configs\Modules\Locus\LocusRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class LocusConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'locus_tags', 'onps' => null];
    }

    /*
 return [
            'id' => 'required|string|min:5|max:5',
            'season_id' => 'required|exists:seasons,id',
            'area_id' => 'required|exists:areas,id',
            'locus_no' => 'required|numeric|min:1|max:999',
            'square' => 'max:20',
            'date_opened' => 'date|nullable',
            'date_closed' => 'date|nullable',
            'level_opened' => 'max:20',
            'level_closed' => 'max:20',
            'locus_above' => 'max:50',
            'locus_below' => 'max:50',
            'locus_co_existing' => 'max:50',
            'description' => 'max:500',
            'deposit' => 'max:500',
            'registration_notes' => 'max:500',
            'clean' => 'required|in:Unassigned,Yes,No',
        ];
    */
    public static function fieldsMeta(): array
    {
        return [
            'id' => [
                'STR',
                ['min' => 5, 'max' => 5, 'nullable' => false, 'default' => '']
            ],
            'season_id' => [
                'LV',
                ['groupName' => 'Season']
            ],
            'area_id' => [
                'LV',
                ['groupName' => 'Area']
            ],
            'locus_no' => [
                'INT',
                ['min' => 0, 'max' => 999, 'nullable' => false, 'default' => 0]
            ],
            'square'  => [
                'STR',
                ['min' => 1, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'date_opened'  => [
                'DAT',
                ['min' => '2013-05-01', 'max' => '2018-08-30', 'nullable' => true, 'default' => null]
            ],
            'date_closed'  => [
                'DAT',
                ['min' => '2013-05-01', 'max' => '2018-08-30', 'nullable' => true, 'default' => null]
            ],
            'level_opened'  => [
                'STR',
                ['min' => 1, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'level_closed'  => [
                'STR',
                ['min' => 1, 'max' => 20, 'nullable' => true, 'default' => null]
            ],
            'locus_above'  => [
                'STR',
                ['min' => 0, 'max' => 50, 'nullable' => true, 'default' => null]
            ],
            'locus_below'  => [
                'STR',
                ['min' => 0, 'max' => 50, 'nullable' => true, 'default' => null]
            ],
            'locus_co_existing'  => [
                'STR',
                ['min' => 0, 'max' => 50, 'nullable' => true, 'default' => null]
            ],
            'description' => [
                'STR',
                ['min' => 0, 'max' => 500, 'nullable' => true, 'default' => null]
            ],
            'deposit' => [
                'STR',
                ['min' => 0, 'max' => 500, 'nullable' => true, 'default' => null]
            ],
            'registration_notes' => [
                'STR',
                ['min' => 0, 'max' => 500, 'nullable' => true, 'default' => null]
            ],
            'clean' => [
                'EM',
                ['groupName' => 'Clean', 'default' => 'Unassigned']
            ],
        ];
    }

    public static function validateItem(array $m): array
    {
        return ["isValid" => true, "messages" => []];
    }

    public static function indexQuery(DigModuleModel $m): Builder
    {
        return $m->select('id');
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
    }

    public static function tagQuery(DigModuleModel $m): Builder
    {
        return $m->select('id');
    }

    public static function tagFormat(DigModuleModel $m): string
    {
        return '1' . $m->id[0] . '/' . $m->id[1] . '/' . (int)substr($m->id, 2);
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

    public static function tabularPageFormat(DigModuleModel $m): array
    {
        return [
            'id' => $m->id,
            'tag' => static::tagFormat($m),
            'Description' => $m->description,
            'Deposit' => $m->deposit,
            'Registrstion Notes' => $m->registration_notes,
            'Level' => $m->level_opened,
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
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags', 'season', 'area']),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => [],
        ], $mediaArrayAndPage);
    }

    public static function orderByDefs(): array
    {
        return [
            // Options can be either (an LV or EM group) or a field name.
            'options' => [
                'Area' => ['isGroup' => true, 'groupName' => 'Area'],
                'Season' => ['isGroup' => true, 'groupName' => 'Season'],
                'Locus No.' => ['isGroup' => false, 'fieldOrSubfield' => 'locus_no']
            ],
            // Hidden options are not available for the user, but can be used as a default "order by".
            'hiddenOptions' => [
                'ID' => ['isGroup' => false, 'fieldOrSubfield' => 'id']
            ],
            'defaults' => [ // 'asc' | 'desc'
                'ID' => 'asc',
            ]
        ];
    }

    public static function validations(): array
    {
        return [
            'taggerFields' => [],
            'categorizedGroups' => [],
            'searchFields' => ['description'],
            'discreteFilterGroups' => ['Area', 'Season', 'Clean'],
        ];
    }

    public static function groups(): array
    {
        return LocusGroups::getGroups();
    }
}
