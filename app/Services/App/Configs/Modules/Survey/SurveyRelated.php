<?php

namespace App\Services\App\Configs\Modules\Survey;

use App\Services\App\Services\Page\PageMainService;
use App\Models\Module\DigModuleModel;

class SurveyRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        return [
            'related_array' => [],
            'related_page' => []
        ];
        //////
        $relatedArray = [];

        // Populate $related_array
        $m->features->each(function (object $rec) use (&$relatedArray) {
            array_push($relatedArray, [
                'relation_name' => 'Has Feature',
                'module' => 'Feature',
                'id' => $rec['id'],
            ]);
        });

        // Get and format $related_page (slice, map to ids, getPage from DB, add module and relation_name)
        $slice = array_slice($relatedArray, 0, $relatedPageLength);
        $mapped = array_map(function ($a) {
            return $a['id'];
        }, $slice);

        $service = new PageMainService('Feature');
        $relatedPage = $service->page($mapped, $relatedPageView);

        foreach ($relatedPage as $key => $rec) {
            $relatedPage[$key]['module'] = 'Feature';
            $relatedPage[$key]['relation_name'] = 'Has Feature';
        }

        return [
            'related_array' => $relatedArray,
            'related_page' => $relatedPage
        ];
    }
}
