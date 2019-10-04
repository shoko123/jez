<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoneTypeController extends Controller
{
    public function index(Request $request)
    {
        $stone_types = StoneType::all();

        return response()->json([
            "stone_types" => $stone_types,
        ], 200);

    }
}
