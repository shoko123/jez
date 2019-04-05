<?php

namespace App\Http\Controllers;

use App\Http\Resources\Locus as LocusResource;
//use App\http\Requests;
use App\Models\Area;
use App\Models\Locus;
//use App\Models\Finds\Find;
//use App\Models\Finds\Pottery\PotteryBasket;

use Illuminate\Http\Request;

class LocusController extends Controller
{
    public function index()
    {
        //since we need to sort by foreign table columns we can't use eloquent built in functionality 
        $loci = Locus::lociWithArea();
        return LocusResource::collection($loci);
    }
    public function lociList()
    {
        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
            ->orderBy('areas.year', 'asc')
            ->orderBy('areas.area', 'asc')
            ->orderBy('loci.locus', 'asc')
            ->get(array('loci.*', 'areas.year', 'areas.area'));

        if ($loci) {
            return response()->json([
                "loci" => $loci,
            ], 200);
        }

    }

    public function show($id)
    {
        $locus = Locus::with(
            ['area' => function ($query) {
                $query->select('id', 'year', 'area');},
                'finds',
                'finds.findable'])->findOrFail($id);

        if ($locus) {
            return response()->json([
                "locus" => $locus,
            ], 200);

            //return new LocusResource($locus);
        } else {
            $response = array(
                'errors' => $error,
                'data' => $data,
            );

            return response()->json([
                'status' => 'error',
                'msg' => 'Locus not found',
            ], 422);
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $locus = new Locus;

        $locus->area_id = $request->area_id;
        $locus->locus = $request->locus;
        $locus->square = $request->square;
        $locus->date_opened = $request->date_opened;
        $locus->date_closed = $request->date_closed;
        $locus->level_opened = $request->level_opened;
        $locus->level_closed = $request->level_closed;
        $locus->locus_above = $request->locus_above;
        $locus->locus_below = $request->locus_below;
        $locus->locus_co_existing = $request->locus_co_existing;
        $locus->description = $request->description;
        $locus->deposit = $request->deposit;
        $locus->registration_notes = $request->registration_notes;

        if ($locus->save()) {
            return $locus;
        } else {
            //this will not work with sql exception - see below caught exception
            $error = array(
                "status" => "404",
                "source" => "Locus Model",
                "title" => "a locus with tag already exists",
            );

            return response()->json([
                'errors' => $error,
            ]);
        }
    }

    public function edit(Locus $locus)
    {
        //
    }

    public function update(Request $request, Locus $locus)
    {
        //
    }

    public function destroy($id)
    {
        $locus = Locus::findOrFail($id);
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }

    public function lociForArea($area_id)
    {
        $locus = Locus::findOrFail($id);
        //NO NO
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }

    public function locusByTag(Request $request)
    {
        $tag = array(
            'year' => $request->year,
            'area' => $request->area,
            'locus_no' => $request->locus_no);
        $locus = Locus::locusByTag($tag);

        if ($locus) {
            return response()->json([
                'locus' => $locus,
                'exists' => true,
            ], 200);
        } else {

            $error = array(
                "status" => "404",
                "source" => "Locus Model",
                "title" => "locus not found",
            );

            return response()->json([
                'errors' => $error,
                'exists' => false,
            ]);

        }

    }
}
