<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Module\DigModuleModel;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\LocusRelated;
use App\Services\App\Services\MediaService;
use App\Services\App\Services\TagService;

class LocusConfig  implements ConfigInterface
{
    public static function fieldsValidation(): array
    {
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
    }

    public static function showQuery(): array
    {
        return [
            'with' => [
                'module_tags.tag_group',
                'global_tags.tag_group',
                'media' => function ($query) {
                    $query->orderBy('order_column')->limit(1);
                }
            ]
        ];
    }

    public static function showFormat(DigModuleModel $m): array
    {
        return [
            'fields' => $m->makeHidden(['media', 'module_tags', 'global_tags']),
            'media' => MediaService::format_media_collection($m->media),
            'global_tags' => TagService::mapTags($m->global_tags),
            'module_tags' => TagService::mapTags($m->module_tags),
            'onps' => [],
        ];
    }

    public static function shortQuery(): array
    {
        return [
            'select' => ['description']
        ];
    }

    public static function shortFormat(DigModuleModel $model): string
    {
        return $model->description ?? '[No description given]';
    }

    public static function tabularPageQuery(): array
    {
        return [
            'select' => [
                'id',
                'date_opened',
                'description',
                'deposit',
                'registration_notes'
            ],
        ];
    }

    public static function tabularPageFormat(DigModuleModel $r): array
    {
        return [
            'id' => $r->id,
            'Date Opened' => $r->date_opened,
            'Description' => $r->description,
            'Deposit' => $r->deposit,
            'Registration Notes' => $r->registration_notes,
        ];
    }

    public static function dateFields(): array
    {
        return ['date_opened', 'date_closed'];
    }

    public static function groups(): array
    {
        return [
            'Square' => [
                'code' => 'TM',
                'multiple' => true,
                'dependency' => [],
            ],
            'Clean' => [
                'code' => 'EM',
                'field_name' => 'clean',
                'useInTagger' => false,
                'showAsTag' => false,
                'dependency' => [],
            ],
            'Search Description' => [
                'code' => 'SF',
                'field_name' => 'description',
            ],
            'Search Deposit' => [
                'code' => 'SF',
                'field_name' => 'deposit',
            ],
            'Search Registration Notes' => [
                'code' => 'SF',
                'field_name' => 'registration_notes',
            ],
            'Order By' => [
                'code' => 'OB',
                'options' => [
                    'Area' => 'area_id',
                    'Season' => 'season_id',
                    'Locus No.' => 'locus_no'
                ]
            ]
        ];
    }

    // Filters groups/fields
    public static function allowed_categorized_filter_group_names(): array
    {
        return [];
    }

    public static function allowed_search_field_names(): array
    {
        return ['description', 'deposit', 'registration_notes'];
    }

    public static function discreteFilterOptions(): array
    {
        return [
            'Area' => 'area_id',
            'Season' => 'season_id',
            'Clean' => 'clean'
        ];
    }

    public static function defaultOrderBy(): array
    {
        return ['id' => 'asc'];
    }

    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $builder;
    }

    public static function allowed_tagger_field_names(): array
    {
        return [];
    }

    // Show
    public static function relatedModules(string $id): array
    {
        return LocusRelated::relatedModules($id, false);
    }

    // Tagger
}
