<?php

namespace App\Http\Controllers;

use App\Models\TestModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    private $model;

    public function __construct()
    {
        $this->model = new TestModel;
    }

    public function test(Request $request)
    {
        $collection = $this->model->index($request->all());

        return response()->json([
            "collection" => $collection,
        ], 200);
    }
}
