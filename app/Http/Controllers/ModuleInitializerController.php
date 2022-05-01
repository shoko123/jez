<?php

namespace App\Http\Controllers;
use App\Models\ModuleInitializer\ModuleInitializer;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    public function index(Request $request)
    {
        $res = ModuleInitializer::init($request["moduleName"]);

        return response()->json([
            "groups" => $res["groups"],
            "welcomeData" => $res["welcomeData"]
        ], 200);
    }
   
}
