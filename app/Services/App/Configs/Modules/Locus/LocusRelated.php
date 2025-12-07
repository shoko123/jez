<?php

namespace App\Services\App\Configs\Modules\Locus;

use App\Services\App\Services\Page\PageRelatedService;

use App\Models\Module\Locus\Locus;
use App\Models\Module\DigModuleModel;
use App\Services\App\Configs\ModulesConfig;


class LocusRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        $relatedArray = [];

        $res = Locus::with([
            'area:id',
            'season:id',
            'ceramics',
            'stones',
            'lithics',
            'fauna',
            'glass',
            'metals'
        ])->findOrFail($m->id);

        // dd('Locus related: ' . $res);

        array_push($relatedArray, [
            'relation_name' => 'Season',
            'module' => 'Season',
            'id' => $res->season->id
        ]);

        array_push($relatedArray, [
            'relation_name' => 'Area',
            'module' => 'Area',
            'id' => $res->area->id
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
}
