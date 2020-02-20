<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Locus;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index(Request $request)
    {
        $areas = Area::orderBy('id')->get(['id', 'tag']);
        return response()->json([
            "areas" => $areas,
        ], 200);

    }

    public function show($id)
    {
        $area = Area::whereId($id)->first();
        return response()->json([
            "area" => $area,
        ], 200);
    }

    public function areaLoci($area_season_id)
    {
        $area = Area::whereId($area_season_id)->first();
        $loci = $area->loci()->get(['id', 'locus_no']);
        
        foreach ($loci as $locus) {
            $locus{"tag"} = $area->tag . '/' . $locus->locus_no;
        }
        
        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }
}
