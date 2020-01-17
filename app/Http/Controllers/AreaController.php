<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Locus;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index(Request $request)
    {
        $areas = Area::orderBy('year')->orderBy('area')->get(['id', 'year', 'area']);

        foreach ($areas as $area) {
            $tag = $area->year - 2000 . '/' . $area->area;          
            $area->{"tag"} = $tag;

            //TODO once new registration implemented, we won't need these:
            //unset($area->year);
            //unset($area->area);
        }

        return response()->json([
            "areas" => $areas,
        ], 200);

    }

    public function loci()
    {
        $areas = Area::with(['loci' => function ($query) {
            $query->select('area_id', 'id', 'locus')->orderBy('locus');},
        'loci.scenes'])->select('id', 'year', 'area')->orderBy('year')->orderBy('area')->get();

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

    public function areaLoci($area_id)
    {
        $area = Area::whereId($area_id)->first();
        $loci = $area->loci()->get(['id', 'locus']);

        foreach ($loci as $locus) {
            $id_string = $area->year - 2000 . '.' . $area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
            $locus->{"id_string"} = $id_string;
        }

        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }
}
