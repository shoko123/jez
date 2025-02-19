<?php

namespace App\Services\App;

use App\Services\App\Utils\GetService;
use App\Models\Module\DigModuleModel;

class BaseService
{
    protected DigModuleModel $model;
    protected static $module;
    protected static $tableName;

    public function __construct(string $module)
    {
        $this->model = GetService::getModel($module, true);
        static::$module = $module;
        static::$tableName = $this->model->tableName();
    }

    function uses_module_tags()
    {
        return method_exists($this->model, 'module_tags');
    }

    function uses_global_tags()
    {
        return property_exists($this->model, 'global_tags');
    }

    function uses_onps()
    {
        return method_exists($this->model, 'onps');
    }
}
