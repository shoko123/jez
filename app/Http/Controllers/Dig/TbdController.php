<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\Tbd;
use Illuminate\Http\Request;

class TbdController extends BaseDigModuleController
{
    public function __construct(Tbd $model)
    {
        $this->model = $model;
    }
}
