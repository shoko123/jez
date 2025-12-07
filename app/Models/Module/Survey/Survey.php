<?php

namespace App\Models\Module\Survey;

use App\Models\Module\DigModuleModel;

use App\Services\App\Configs\ModulesConfig;

class Survey extends DigModuleModel
{
    public function __construct()
    {
        $this->table = ModulesConfig::modules()['Survey'];
    }
}
