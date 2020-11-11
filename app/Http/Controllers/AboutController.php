<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\JezStatic\AboutPages;

class AboutController extends Controller
{
    public function index()
    {
        return response()->json([
            "collection" => AboutPages::index(),
        ], 200);
    }

    public function show($id)
    {
        return response()->json([
            "item" => AboutPages::show($id),
        ], 200);
    }
}
