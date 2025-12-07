<?php

namespace App\Services\App\Services\Module;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Services\ModuleService;
use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;

class ShowService extends ModuleService
{
    protected DigModuleModel $model;
    protected Builder $builder;

    public function __construct(string $module)
    {
        parent::__construct($module);
    }

    public function carousel_main(string $module, int $id): array
    {
        $m = GetService::getModel($module, true);
        $res = $this->cfg->idTagShortMedia1Query($m)->findOrfail($id);
        $formatted = $this->cfg->idTagShortMedia1Format($res);
        $formatted['module'] = $module;
        return $formatted;
    }

    public function show(string $id, string $relatedPageView, int $relatedPageLength, int $mediaPageLength): array
    {
        $this->builder = $this->cfg->showQuery($this->model);
        $show = $this->builder->findOrFail($id);
        $showFormatted = $this->cfg->showFormat($show, $mediaPageLength);
        $related = $this->cfg->getRelated($show, $relatedPageView, $relatedPageLength);
        return array_merge($showFormatted, $related);
    }
}
