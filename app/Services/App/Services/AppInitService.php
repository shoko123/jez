<?php

namespace App\Services\App\Services;

use App\Services\App\Configs\AppInitConfigs;

class AppInitService
{
    public static function init()
    {
        return AppInitConfigs::get();
    }
}
