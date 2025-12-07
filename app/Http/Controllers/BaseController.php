<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;

use App\Services\App\Configs\ModulesConfig;
use App\Services\App\ServiceEnum;
use App\Services\App\GetService;

class BaseController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    protected static function makeDigModuleService(ServiceEnum $service, string $module)
    {
        if (! array_key_exists($module, ModulesConfig::modules())) {
            abort(422, '*** Illegal module field value: "' . $module . '"');
        }

        switch ($service) {
            case ServiceEnum::Init:
                return GetService::getService(ServiceEnum::Init, $module);

            case ServiceEnum::Mutate:
                return GetService::getService(ServiceEnum::Mutate, $module);

            case ServiceEnum::Index:
                return GetService::getService(ServiceEnum::Index, $module);

            case ServiceEnum::Show:
                return GetService::getService(ServiceEnum::Show, $module);

            default:
                abort(422, '*** Illegal service value');
        }
    }
}
