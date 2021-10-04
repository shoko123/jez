<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;


class BaseDigModuleController extends Controller
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;     
    }
}