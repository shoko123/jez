<?php

namespace App\Http\Controllers\Dig;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BaseDigModuleController;

class AboutController extends BaseDigModuleController
{
    public function index()
    {
        $collection = DB::table('about')
            ->select('about.*', DB::raw("CONCAT(tab,'.',no) as dot"))
            ->get();

        return response()->json([
            "collection" => $collection,
        ], 200);
    }
}
