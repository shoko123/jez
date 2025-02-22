<?php

namespace App\Services\App;

enum ServiceEnum
{
    case Init;
    case Read;
    case Mutate;
    case Index;
    case Page;
    case Show;
}

class GetService
{
    public static function getModel(string $module, bool $new = false)
    {
        $full_class = 'App\Models\Module\Specific\\' . $module . '\\' . $module;
        return $new ? new $full_class : $full_class;
    }

    public static function getTagGroupModel(string $module)
    {
        $tagGroupName = 'App\Models\Module\Specific\\' . $module . '\\' . $module . 'TagGroup';
        return new $tagGroupName;
    }

    public static function getService(string $serviceName, string $module)
    {
        $servicePath = 'App\Services\App\Services\\' . $serviceName . 'Service';
        return new $servicePath($module);
    }

    public static function getInitDetails(string $module)
    {
        $details = 'App\Services\App\Configs\\' . $module  . 'InitDetails';
        return new $details;
    }

    public static function getConfigs(string $module)
    {
        $configs = 'App\Services\App\Configs\\'  . $module .  'Config';
        return new $configs;
    }
}
