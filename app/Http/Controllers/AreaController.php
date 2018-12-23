<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Area;

class AreaController extends Controller
{
    public function index(Request $request)
    {
        $areas = Area::areasList();

        return response()->json([
            "areas" => $areas
        ], 200);
    }

    public function show($id)
    {
        $area = Area::whereId($id)->first();
        return response()->json([
            "area" => $area, 
        ], 200);
    }

    public function loci($area_id)
    {
        $area = Area::whereId($area_id)->first();
        $loci = $area->loci()->get();
        
        return response()->json([
            "lociForArea" => $loci
        ], 200);
    }

    public function maxLocusNo($area_id)
    {
        $area = Area::whereId($area_id)->first();
        $maxLocusNo = $area->loci()->get()->max('locus');
        
        return response()->json([
            "maxLocusNoForArea" => $maxLocusNo
        ], 200);
    }
}


