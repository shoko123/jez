<?php

namespace App\Http\Controllers;

use App\Settings\GlobalSettings;
use Illuminate\Http\Request;

class GlobalSettingsController extends Controller
{
    public function set(Request $request, GlobalSettings $gs)
    {
        return response()->json([
            "globalSettings" => $gs,
        ], 200);
    }

    public function get(GlobalSettings $gs)
    {
        return response()->json([
            "settings" => $gs->get(),
        ], 200);

    }
}
