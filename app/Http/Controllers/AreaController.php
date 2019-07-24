<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Locus;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function index(Request $request)
    {
        //$areas = \DB::table('areas')->select('id', 'year', 'area')->orderBy('year')->orderBy('area')->get();
        $areas = Area::orderBy('year')->orderBy('area')->get(['id', 'year', 'area']);
        //$areas = Area::areasList();

        return response()->json([
            "areas" => $areas,
        ], 200);

    }

    public function areasWithLoci()
    {
        $areas = Area::with(['loci' => function ($query) {
            $query->select('area_id', 'id', 'locus')->orderBy('locus');},
        ])->select('id', 'year', 'area')->orderBy('year')->orderBy('area')->get();

        return response()->json([
            "areas" => $areas,
        ], 200);
    }

    public function areas0()
    {
        $areas = Area::with(['loci' => function ($query) {
            $query->select('area_id', 'id', 'locus')->orderBy('locus');},
        ])->select('id', 'year', 'area')->orderBy('year')->orderBy('area')->get();

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

    public function lociListForArea($area_id)
    {
        //$area = Area::whereId($area_id)->with(['loci' => function ($query) {
        //$query->select('id AS locus_id', 'locus', 'area_id');}])->get();

        $area = Area::whereId($area_id)->first();
        $loci = $area->loci()->get(['id', 'locus']);

        //$loci_formatted = $loci->map(function ($locus) use ($area) {
        //    return ['year' => $area->year, 'area' => $area->area, 'locus' => $locus->locus, 'locus_id' => $locus->id, 'area_id' => $area->id];
        //});

        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }

    public function maxLocusNo($area_id)
    {
        $area = Area::whereId($area_id)->first();
        $maxLocusNo = $area->loci()->get()->max('locus');

        return response()->json([
            "maxLocusNoForArea" => $maxLocusNo,
        ], 200);
    }
}
