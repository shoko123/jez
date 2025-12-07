<?php

namespace App\Services\App;

enum ServiceEnum
{
    case Init;
    case Read;
    case Mutate;
    case Index;
    case Show;
}

class GetService
{
    public static function getService(ServiceEnum $serviceName, string $module)
    {
        $servicePath = 'App\Services\App\Services\Module\\' . $serviceName->name . 'Service';
        return new $servicePath($module);
    }

    public static function getModel(string $module, bool $new = false)
    {
        $full_class = 'App\Models\Module\\' . $module . '\\' . $module;
        return $new ? new $full_class : $full_class;
    }

    public static function getTagGroupModel(string $module)
    {
        $full_class = 'App\Models\Module\\' . $module . '\\' . $module . 'TagGroup';
        return class_exists($full_class) ? new $full_class : null;
    }

    public static function getInitDetails(string $module)
    {
        $details = 'App\Services\App\Configs\Modules\\' . $module . '\\' . $module . 'InitDetails';
        return new $details;
    }
}
