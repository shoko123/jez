<?php

namespace App\Services\App\Services\Carousel;

use App\Services\App\GetService;
use App\Services\App\Services\ModuleService;

class CarouselModuleAndIdService extends ModuleService
{
    public function __construct(string $module)
    {
        parent::__construct($module);
    }

    public function show($id): array
    {
        $m = GetService::getModel($this->cfg->module(), true);
        $res = $this->cfg->idTagShortMedia1Query($m)->findOrfail($id);

        $formatted = static::idTagShortMedia1Format($res);
        $formatted['module'] = $this->cfg->module();
        return $formatted;
    }
}
