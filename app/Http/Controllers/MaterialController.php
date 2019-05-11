<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Finds\Material;
class MaterialController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $materials = Material::all();

        return response()->json([
            "materials" => $materials,
        ], 200);

    }
}
