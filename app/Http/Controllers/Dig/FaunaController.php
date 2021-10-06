<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\Fauna;

class FaunaController extends BaseDigModuleController
{
    public function __construct(Fauna $model)
    {
        $this->model = $model;
    }
}
