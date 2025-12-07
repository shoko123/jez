<?php

namespace App\Services\App\Configs\Modules\Lithic;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

use App\Services\App\Configs\Modules\Lithic\LithicGroups;
use App\Services\App\Configs\Modules\Lithic\LithicRelated;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Services\App\Configs\BaseConfig;
use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\TagService;

class LithicConfig extends BaseConfig implements ModuleConfigInterface
{
    public static function relatedTables(): array
    {
        return ['tags' => 'lithic_tags', 'onps' => 'lithic_onps'];
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
            'field_description' => [
                'STR',
                ['min' => 0, 'max' => 100, 'nullable' => true, 'default' => null]
            ],
            'registration_notes' => [
                'STR',
                ['min' => 0, 'max' => 100, 'nullable' => true, 'default' => null]
            ],
            'weight' => [
                'INT',
                ['min' => 1, 'max' => 1000, 'nullable' => true, 'default' => null]
            ],
            'specialist_notes' => [
                'STR',
                ['min' => 0, 'max' => 100, 'nullable' => true, 'default' => null]
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
        if (count($m->onps) === 0) {
            return $m->field_description ?? '[No typology or description given]';
        }

        $all = $m->onps->reduce(function (?string $carry, object $item) {
            return $carry .= $item['label'] . '(' . $item['pivot']['value'] . '), ';
        });

        return  substr($all, 0, -2);
    }

    public static function tabularPageQuery(DigModuleModel $m): Builder
    {
        return $m->select('id', 'date_retrieved', 'weight', 'field_description', 'specialist_notes')
            ->with('onps');
    }

    public static function tabularPageFormat(DigModuleModel $m): array
    {
        $counts_text = (count($m->onps) === 0) ? 'Single Item' : substr($m->onps->reduce(function (?string $carry, object $item) {
            return $carry .= $item['label'] . '(' . $item['pivot']['value'] . '), ';
        }), 0, -2);

        return [
            'id' => $m->id,
            'tag' => static::tagFormat($m),
            'Date Retrieved' => $m->date_retrieved,
            'Counts' => $counts_text,
            'Field Description' => $m->field_description,
            'Specialist Notes' => $m->specialist_notes,
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
            'searchFields' => [],
            'discreteFilterGroups' => ['Area', 'Season', 'Registration Code', 'Primary Classification', 'Material'],
        ];
    }

    public static function groups(): array
    {
        return LithicGroups::getGroups();
    }
}
