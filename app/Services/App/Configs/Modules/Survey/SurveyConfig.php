<?php

namespace App\Services\App\Configs\Modules\Survey;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Survey\SurveyGroups;
use App\Services\App\Configs\Modules\Survey\SurveyRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Models\Module\DigModuleModel;

class SurveyConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => null, 'onps' => null];
    }

    public static function fieldsMeta(): array
    {
        return [
            'id' => [
                'STR',
                ['min' => 2, 'max' => 5, 'nullable' => false, 'default' => 0]
            ],
            'area_id' => [
                'STR',
                ['min' => 1, 'max' => 1, 'nullable' => false, 'default' => '']
                // 'RV',      
                // ['groupName' => 'Area']
            ],
            'feature_no' => [
                'INT',
                ['min' => 1, 'max' => 999, 'nullable' => false, 'default' => 0]
            ],
            'surveyed_date'  => [
                'DAT',
                ['min' => '2012-06-01', 'max' => '2012-06-30', 'nullable' => true, 'default' => null]
            ],
            'elevation'  => [
                'STR',
                ['min' => 1, 'max' => 999, 'nullable' => true, 'default' => null]
            ],
            'next_to'  => [
                'STR',
                ['min' => 1, 'max' => 100, 'nullable' => true, 'default' => null]
            ],
            'description' => [
                'STR',
                ['min' => 0, 'max' => 500, 'nullable' => true, 'default' => null]
            ],
            'notes' => [
                'STR',
                ['min' => 0, 'max' => 500, 'nullable' => true, 'default' => null]
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
        return $m->id[0] . '/' . (int)substr($m->id, 1);
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
            'Elevation' => $m->elevation,
            'Surveyed Date' => $m->surveyed_date,
            'Notes' => $m->notes,
        ];
    }

    public static function showQuery(DigModuleModel $m): Builder
    {
        return  $m->with(
            BaseConfig::withMedia(true),
        );

        // Minimal requirements to use eloquent's 'with' to get media ids.
        // (In case we want just ids, and use PageMediaService::page($media_ids) to get the first page).
        // For simplicity, we instead do only one DB access and format it below (return {media_ids: int[], media_page: {media info}}).
        // return $m->with(['media' => function ($query) {
        //     $query->select('id', 'model_type', 'model_id', 'disk')
        //         ->orderBy('order_column');
        // }]);
    }

    public static function showFormat(DigModuleModel $m, int $mediaPageLength): array
    {
        $mediaArrayAndPage = static::getMediaArrayAndPage($m->media, $mediaPageLength);

        return array_merge([
            'tag' => static::tagFormat($m),
            'fields' => $m->makeHidden(['media']),
            'module_tags' => [],
            'global_tags' => [],
            'onps' => [],
        ], $mediaArrayAndPage);
    }


    public static function orderByDefs(): array
    {
        return [
            // Options can be either (an LV or EM group) or a field name.
            'options' => [
                'Area' => ['isGroup' => true, 'groupName' => 'Area'],
                'Feature No.' => ['isGroup' => false, 'fieldOrSubfield' => 'feature_no']
            ],
            // Hidden options are not available for the user, but can be used as a default "order by".
            'hiddenOptions' => [
                'ID' => ['isGroup' => false, 'fieldOrSubfield' => 'id']
            ],
            'defaults' => [ // 'asc' | 'desc'
                'Area' => 'asc',
                'Feature No.' => 'asc'
            ]
        ];
    }

    public static function validations(): array
    {
        return [
            'taggerFields' => [],
            'categorizedGroups' => [],
            'searchFields' => ['description'],
            'discreteFilterGroups' => ['Area'],
        ];
    }

    public static function groups(): array
    {
        return SurveyGroups::getGroups();
    }
}
