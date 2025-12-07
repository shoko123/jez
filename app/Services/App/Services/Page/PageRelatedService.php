<?php

namespace App\Services\App\Services\Page;

use App\Services\App\Services\Page\PageMainService;

class PageRelatedService
{
    public function page(array $relations, string $view): array
    {
        $groups = [];
        $formatted = [];

        foreach ($relations as $rec) {
            if (array_key_exists($rec['module'], $groups)) {
                array_push($groups[$rec['module']], $rec['id']);
            } else {
                $groups[$rec['module']] = [$rec['id']];
            }
        }

        foreach ($groups as $module => $ids) {
            $service = new PageMainService($module);

            // Multiple modules 'Tabular' view uses standard fields available via the 'Gallery' view
            $moduleArray = $service->page($ids, ($view === 'Tabular' ? 'Gallery' : $view));
            $formatted = array_merge($formatted, $moduleArray);
        }

        foreach ($formatted as $key => $rec) {
            $formatted[$key]['module'] = $relations[$key]['module'];
            $formatted[$key]['relation_name'] = $relations[$key]['relation_name'];
        }

        return $formatted;
    }
}
