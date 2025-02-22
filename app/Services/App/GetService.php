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
        if ($new) {
            return new $full_class;
        } else {
            return $full_class;
        }
    }

    public static function getTagGroupModel(string $module)
    {
        $tagGroupName = 'App\Models\Module\Specific\\' . $module . '\\' . $module . 'TagGroup';
        return new $tagGroupName;
    }

    public static function getService(string $serviceName, string $module)
    {
        $servicePath = '';
        switch ($serviceName) {
            case 'Init':
                $servicePath = 'App\Services\App\Init\InitService';
                break;
            case 'Index':
                $servicePath = 'App\Services\App\Services\IndexService';
                break;
            case 'Page':
                $servicePath = 'App\Services\App\Services\PageService';
                break;
            case 'Show':
                $servicePath = 'App\Services\App\Services\ShowService';
                break;
            case 'Mutate':
                $servicePath = 'App\Services\App\Services\MutateService';
                break;
        }
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
