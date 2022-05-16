<?php

namespace App\Http\Controllers;

use App\Models\TestModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{
    private $model;

    public function __construct()
    {
        $this->model = new TestModel;
    }


    public function test1(Request $request)
    {
        $collection = $this->model->index($request->all());

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function test(Request $request)
    {
        // return response()->json([
        //     "msg" => 'Test1',
        //     "name" => $request->name
        // ], 200);

        $name = $request->file('image')->getClientOriginalName();
        $extension = $request->file('image')->getClientOriginalExtension();
        $fullName = $name . '.' . $extension;
        // $path = $request->file('image')->storeAs(
        //     '/tmp',
        //     $fullName,
        //     's3'
        // );
        $file = Storage::get('/Tbd0.jpg');
        $header = [
            'Content-Type' => 'image/jpeg'
        ];
        
        return response($file, 200, $header);
    }

}
