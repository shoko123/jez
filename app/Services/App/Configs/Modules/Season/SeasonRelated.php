<?php

namespace App\Services\App\Configs\Modules\Season;

use App\Services\App\Services\Page\PageRelatedService;
use App\Models\Module\DigModuleModel;

class SeasonRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        // Prepare the related array - all related loci ids should be in the showQuery result
        // Make sure that SeasnConfigs.showQuery() indeed defines them!
        $relatedArray = [];
        $relatedPage = [];

        $m->loci->each(function (object $rec) use (&$relatedArray) {
            array_push($relatedArray, [
                'relation_name' => 'Has Loci',
                'module' => 'Locus',
                'id' => $rec['id'],
            ]);
        });

        $slice = array_slice($relatedArray, 0, $relatedPageLength);
        $service = new PageRelatedService();
        $relatedPage = $service->page($slice, $relatedPageView);

        return [
            'related_array' => $relatedArray,
            'related_page' => $relatedPage
        ];
    }
}
