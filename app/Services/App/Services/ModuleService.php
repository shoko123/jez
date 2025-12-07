<?php

namespace App\Services\App\Services;

use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\MediaService;
use App\Services\App\Configs\ModuleConfig;

class ModuleService
{
    protected DigModuleModel $model;
    protected $cfg;
    protected static $module;

    public function __construct(string $module)
    {
        $this->model = GetService::getModel($module, true);
        $this->cfg = new ModuleConfig($module);
    }

    public static function withMedia($all = false)
    {
        if ($all) {
            return  ['media' => function ($query) {
                $query->orderBy('order_column');
            }];
        } else {
            return  ['media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            }];
        }
    }

    public function idTagShortMedia1Format(DigModuleModel $m): array
    {
        return  [
            'id' => $m->id,
            'tag' => $this->cfg->tagFormat($m),
            'short' => $this->cfg->shortFormat($m),
            'urls' => count($m['media']) === 0 ? null : MediaService::get_paths($m['media'][0])
        ];
    }
}
