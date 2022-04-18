<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\FaunaStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Fauna;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class FaunaController extends BaseDigModuleController
{
    public function __construct(Fauna $model)
    {
        $this->model = $model;
    }
  
    public function index(Request $request)
    {
        $collection = $this->model->indexForFinds($request->all());

        return response()->json([
            "collection" => $collection,
        ], 200);
    }
}
