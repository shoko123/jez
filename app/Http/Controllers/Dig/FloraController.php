<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\Flora;

class FloraController extends BaseDigModuleController
{
    public function __construct(Flora $model)
    {
        $this->model = $model;
    }
}
