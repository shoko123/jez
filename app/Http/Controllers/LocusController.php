<?php

namespace App\Http\Controllers;

use App\Models\Locus;
//use App\http\Requests;
use Illuminate\Http\Request;
use App\Http\Resources\Locus as LocusResource;

class LocusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        //$loci = Locus::all()->with();
        //$loci = Locus::myLoci();
        

        //return response()->json([
        //    "loci" => $loci
        //], 200);
        
        
        


        //$loci = Locus::orderBy('locus', )->get();

        $loci = Locus::lociList();
        
        /*
        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
        ->orderBy('areas.year', 'asc')
        ->orderBy('areas.area', 'asc')
        ->orderBy('loci.locus', 'asc') 
        ->get(array('loci.id', 'square', 'date_opened', 'date_closed', 'level_opened', 
        'level_closed', 'locus_above', 'locus_below', 'locus_co_existing', 'loci.description', 'deposit',
        'registration_notes', 'areas.year', 'areas.area', 'loci.locus'));
            */

        //$loci = Locus::all();
        //return $loci;

        
        return LocusResource::collection($loci);     
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
        
        if($locus->save()) {
            return new LocusResource($locus);
        }
        else {
            
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Locus  $locus
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $locus = Locus::locusWithArea($id);
        //return new LocusResource($locus);
        
        /*
        $locus = \DB::table('loci')
            ->select('loci.*', 'areas.area', 'areas.year')
            ->join('areas', 'loci.area_id', '=', 'areas.id')
            ->where('loci.id', '=', $id )
            ->get();
       */
        return new LocusResource($locus);
        //return $locus;
        
        /*
        $locus = Locus::whereId($id)->first();

        return response()->json([
            "locus" => $locus
        ], 200);
        */
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Locus  $locus
     * @return \Illuminate\Http\Response
     */
    public function edit(Locus $locus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Locus  $locus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Locus $locus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Locus  $locus
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $locus = Locus::findOrFail($id);
        if($locus->delete()) {
            return new LocusResource($locus);
        }
    }
}
