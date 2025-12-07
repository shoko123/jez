<?php

namespace App\Services\App\Configs\Modules\Area;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Area\AreaGroups;
use App\Services\App\Configs\Modules\Area\AreaRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Models\Module\DigModuleModel;


class AreaConfig extends BaseConfig implements ModuleConfigInterface
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
                ['min' => 1, 'max' => 1, 'nullable' => false, 'default' => 0]
            ],
            'description' => [
                'STR',
                ['min' => 0, 'max' => 2000, 'nullable' => true, 'default' => null]
            ],
            'notes' => [
                'STR',
                ['min' => 0, 'max' => 2000, 'nullable' => true, 'default' => null]
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

    public static function orderByDefs(): array
    {
        return [
            // options can be either (an LV or EM group) or a field name.
            'options' => [
                'Area' => ['isGroup' => false, 'fieldOrSubfield' => 'id'],
            ],
            'hiddenOptions' => [],
            'defaults' => [ // 'asc' | 'desc'
                'Area' => 'asc',
            ]
        ];
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
        return $m->id;
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
            'description' => Str::substr($m->description, 0, 200),
            'notes' => Str::substr($m->notes, 0, 200)
        ];
    }

    public static function showQuery(DigModuleModel $m): Builder
    {
        return  $m->with(
            [
                'media' => function ($query) {
                    $query->orderBy('order_column');
                },
                'loci' => function ($query) {
                    $query->orderBy('id');
                }
            ]
        );
    }

    public static function showFormat(DigModuleModel $m, int $mediaPageLength): array
    {
        $mediaArrayAndPage = static::getMediaArrayAndPage($m->media, $mediaPageLength);

        return array_merge([
            'tag' => static::tagFormat($m),
            'fields' => $m->makeHidden(['media', 'loci']),
            'module_tags' => [],
            'global_tags' => [],
            'onps' => [],
        ], $mediaArrayAndPage);
    }

    public static function validations(): array
    {
        return [
            'taggerFields' => [],
            'categorizedGroups' => [],
            'searchFields' => [],
            'discreteFilterGroups' => ['Area'],
        ];
    }

    public static function groups(): array
    {
        return AreaGroups::getGroups();
    }
}
