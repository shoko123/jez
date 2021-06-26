<?php

namespace App\Http\Controllers;

use App\JezStatic\AboutPages;
use App\Settings\GlobalSettings;

class AboutController extends Controller
{
    public function index(GlobalSettings $gs)
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
