<?php

namespace App\Http\Controllers;

use App\Http\Requests\Carousel\CarouselModuleAndIdRequest;
use Illuminate\Http\Request;
use App\Services\App\Services\Carousel\CarouselModuleAndIdService;
use App\Services\App\Services\Carousel\CarouselMediaService;

class CarouselController extends BaseController
{
    /**
     * Retrieve data needed to show a carousel item. Sources are 'main', 'media', or 'related.
     */
    public function main(CarouselModuleAndIdRequest $r)
    {
        return $this->mainOrRelated($r);
    }

    public function media(Request $r)
    {
        $v = $r->validate([
            'id' => ['required', 'exists:media,id']
        ]);

        $service = new CarouselMediaService();
        return $service->show($v['id']);
    }

    public function related(CarouselModuleAndIdRequest $r)
    {
        return $this->mainOrRelated($r);
    }

    private function mainOrRelated(CarouselModuleAndIdRequest $r)
    {
        $v = $r->validated();
        $service = new CarouselModuleAndIdService($v['module']);
        return $service->show($v['id']);
    }
}
