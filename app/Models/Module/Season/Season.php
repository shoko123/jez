<?php

namespace App\Models\Module\Season;

use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Services\App\Configs\ModulesConfig;

class Season extends DigModuleModel
{
    public function __construct()
    {
        $this->table = ModulesConfig::modules()['Season'];
    }

    public function loci()
    {
        return $this->hasMany(GetService::getModel('Locus'));
    }
}
