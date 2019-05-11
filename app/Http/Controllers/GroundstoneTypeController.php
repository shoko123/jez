<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Finds\Stone\GroundstoneType;

class GroundstoneTypeController extends Controller
{
    public function index(Request $request)
    {
        $groundstone_types = GroundstoneType::all();

        return response()->json([
            "groundstone_types" => $groundstone_types,
        ], 200);

    }
}
