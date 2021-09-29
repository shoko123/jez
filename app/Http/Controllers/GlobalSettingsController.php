<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GlobalSettingsController extends Controller
{
    public function accessibility()
    {
        $d = config('accessibility.accessibility');
        return response()->json([
            "accessibility" => $d,
        ], 200);

    }
}
