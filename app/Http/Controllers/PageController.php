<?php

namespace App\Http\Controllers;

use App\Http\Requests\Page\MainPageRequest;
use App\Http\Requests\Page\RelatedPageRequest;
use App\Http\Requests\Page\MediaPageRequest;
use App\Services\App\Services\Page\PageMainService;
use App\Services\App\Services\Page\PageRelatedService;
use App\Services\App\Services\Page\PageMediaService;

class PageController extends BaseController
{
    public function mainPage(MainPageRequest $r)
    {
        $v = $r->validated();
        $service = new PageMainService($v['module']);
        return response()->json($service->page($v['ids'], $v['view']), 200);
    }

    public function relatedPage(RelatedPageRequest $r)
    {
        $v = $r->validated();
        $service = new PageRelatedService();
        return response()->json($service->page($v['relations'], $v['view']), 200);
    }

    public function mediaPage(MediaPageRequest $r)
    {
        $v = $r->validated();
        $service = new PageMediaService();
        return response()->json($service->page($v['ids']), 200);
    }
}
