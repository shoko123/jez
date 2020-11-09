<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        $collection = About::select('id', 'category_index', 'title')
            ->orderBy('category_index')
            ->orderBy('index')
            ->get();
        return response()->json([
            "collection" => $collection,
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
