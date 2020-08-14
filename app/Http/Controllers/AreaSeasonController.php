<?php

namespace App\Http\Controllers;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;

class AreaSeasonController extends Controller
{
    public function index(Request $request)
    {
        $areas = AreaSeason::orderBy('id')->get(['id', 'tag']);
        return response()->json([
            "collection" => $areas,
        ], 200);

    }

    public function show($id)
    {
        $areaSason = AreaSeason::whereId($id)->first();
        return response()->json([
            "item" => $areaSason,
        ], 200);
    }

    public function areaLoci($area_season_id)
    {
        $areaSason = AreaSeason::whereId($area_season_id)->first();
        $loci = $areaSason->loci()->get(['id', 'locus_no']);
        
        foreach ($loci as $locus) {
            $locus{"tag"} = $areaSason->tag . '/' . $locus->locus_no;
        }
        
        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }
}
