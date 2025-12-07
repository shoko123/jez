<?php

namespace App\Services\App\Configs\Common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;

use App\Services\App\Services\Page\PageRelatedService;
use App\Services\App\Configs\ModulesConfig;

class CommonToFinds
{
    // Note - Groups common to finds are located at
    // App\Services\App\Configs\Common\CommonInitGroups

    public static function validateFindIdConsistency(array $m): array
    {
        if (substr($m["id"], 0, 5) === $m["locus_id"]) {
            return ["isValid" => true, "messages" => []];
        }
        $message = "Inconsistency between id: " . $m["id"] . " and locus id: " . $m["locus_id"];
        return ["isValid" => false, "messages" => [$message]];
    }

    public static function filterScope(Builder $builder, array $vals): Builder
    {
        if (count($vals) !== 1) {
            return $builder;
        }

        $builder->Where(function ($query) use ($vals) {
            if ($vals[0]['name'] === 'Basket') {
                $query->where(DB::raw('substr(id, 10, 2)'), '=', '00');
            } else {
                $query->where(DB::raw('substr(id, 10, 2)'), '!=', '00');
            }
        });

        return $builder;
    }

    public static function getFindSeasonGroup()
    {
        return  [
            'code' => 'LV',
            'fieldOrSubfield' => ['name' => 'locus_id', 'start' => 1, 'length' => 1], // SQL Base 1
            'lookup_table_name' => 'seasons',
            'lookup_text_field' => 'id',
            'lookup_order_by_field' => 'id',
            'manipulator' => function ($val) {
                return (string) ($val + 2010);
            },
            'useInTagger' => false,
            'showAsTag' => false,
            'dependency' => [],
        ];
    }

    public static function getFindAreaGroup()
    {
        return [
            'code' => 'LV',
            'fieldOrSubfield' => ['name' => 'locus_id', 'start' => 2, 'length' => 1], // SQL Base 1
            'lookup_table_name' => 'areas',
            'lookup_text_field' => 'id',
            'lookup_order_by_field' => 'id',
            'useInTagger' => false,
            'showAsTag' => false,
            'dependency' => [],
        ];
    }

    public static function orderByDefs(): array
    {
        return [
            // Options can be either (an LV or EM group) or a (field or subfield).
            'options' => [
                'Area' => ['isGroup' => true, 'groupName' => 'Area'],
                'Season' => ['isGroup' => true, 'groupName' => 'Season'],
                'Locus No.' => ['isGroup' => false, 'fieldOrSubfield' => ['name' => 'id', 'start' => 3, 'length' => 3]],
                'Registration Code' => ['isGroup' => true, 'groupName' => 'Registration Code'],
                'Basket No.' => ['isGroup' => false, 'fieldOrSubfield' => ['name' => 'id', 'start' => 8, 'length' => 2]],
                'Artifact No.' => ['isGroup' => false, 'fieldOrSubfield' => ['name' => 'id', 'start' => 10, 'length' => 2]],
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

    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        $relatedArray = [];

        $res = Locus::with([
            'ceramics',
            'stones',
            'lithics',
            'fauna',
            'glass',
            'metals'
        ])->findOrFail(substr($m->id, 0, 5));

        array_push($relatedArray, [
            'relation_name' => 'Locus',
            'module' => 'Locus',
            'id' => $res->id
        ]);

        // Add all small finds
        $allModules = array_flip(ModulesConfig::modules());
        $finds = array_slice($allModules, 4, 6, true);

        foreach ($finds as $key => $module) {
            foreach ($res[$key] as $rec) {
                array_push($relatedArray, [
                    'relation_name' => 'Locus Finds',
                    'module' => $module,
                    'id' => $rec->id
                ]);
            }
        }

        // Get $related_array:
        // (1) Slice the related array to the related page length.
        // (2) Retrieve from the DB (using the page service)

        $slice = array_slice($relatedArray, 0, $relatedPageLength);
        $service = new PageRelatedService();
        $relatedPage = $service->page($slice, $relatedPageView);

        return [
            'related_array' => $relatedArray,
            'related_page' => $relatedPage
        ];
    }

    public static function tagQuery(DigModuleModel $m): Builder
    {
        return $m->select('id');
    }

    public static function tagFormat(DigModuleModel $m): string
    {
        return '1' . $m->id[0] . '/' . $m->id[1] . '/' . (int)substr($m->id, 2, 5) . '.' . substr($m->id, 5, 2) . '.' . intval(substr($m->id, 7, 2)) . '.' . intval(substr($m->id, 9, 2));
    }
}
