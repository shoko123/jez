<?php

namespace App\Http\Controllers;

use App\Models\About;

use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            "collection" => About::all(),
        ], 200);
    }

    public function show($id)
    {
        $item = About::findOrFail($id);       
        return response()->json([
            "item" => $item,
        ], 200);
    }
}
