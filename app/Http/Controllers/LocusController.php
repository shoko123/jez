<?php

namespace App\Http\Controllers;

use App\Http\Resources\Locus as LocusResource;
//use App\http\Requests;
use App\Models\Locus;
use Illuminate\Http\Request;

class LocusController extends Controller
{
    public function index()
    {
        //since we need to sort by foreign table columns we can't use eloquent built in functionality (commented below).
        $loci = Locus::lociWithArea();
        return LocusResource::collection($loci);

        //$loci = Locus::with('area')->get();
        //return LocusResource::collection($loci);
    }

    public function show($id)
    {
        $locus = Locus::locusWithArea($id);

        
        if($locus) {
            return new LocusResource($locus);
        } else {

            //return response()->json($response, 200);
            //abort(403, 'Locus not found');
            
            $data = 54;
            $error = array(
                "status" => "201",
                "source" => "Locus Model",
                "title" =>  "locus not found",
            );
            

            $response = array(
            'errors' => $error,
            'data' => $data

            );

            return response()->json([
                'status' => 'error',
                'msg'    => 'Locus not found',
            ], 422);
            //return response()->json($response);
            
        }

        //return $locus ? new LocusResource($locus) : response()->json([
        //    "error" => "locus not found",
        //], 200);
        
                
        return new LocusResource($locus);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $locus = new Locus;

        $locus->area_id = $request->input('area_id');
        $locus->locus_no = $request->input('locus_no');
        $locus->square = $request->input('square');
        $locus->date_opened = $request->input('date_opened');
        $locus->date_closed = $request->input('date_closed');
        $locus->level_opened = $request->input('level_opened');
        $locus->level_closed = $request->input('level_closed');
        $locus->locus_above = $request->input('locus_above');
        $locus->locus_below = $request->input('locus_below');
        $locus->locus_co_existing = $request->input('locus_co_existing');
        $locus->description = $request->input('description');
        $locus->deposit = $request->input('deposit');
        $locus->registration_notes = $request->input('registration_notes');

        if ($locus->save()) {
            return new LocusResource($locus);
        } else {

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
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }
}
