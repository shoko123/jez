<?php

namespace App\Models\Module\Area;

use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Services\App\Configs\ModulesConfig;

class Area extends DigModuleModel
{
    public function __construct()
    {
        $this->table = ModulesConfig::modules()['Area'];
    }

    public function loci()
    {
        return $this->hasMany(GetService::getModel('Locus'));
    }
}
