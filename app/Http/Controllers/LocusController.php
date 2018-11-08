<?php

namespace App\Http\Controllers;

use App\Models\Locus;
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
        
        $loci = Locus::all();

        return response()->json([
            "loci" => $loci
        ], 200);
        
        //$loci = Locus::paginate(20);
        //return LocusResource::collection($loci);
        

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Locus  $locus
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $locus = Locus::whereId($id)->first();

        return response()->json([
            "locus" => $locus
        ], 200);
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
    public function destroy(Locus $locus)
    {
        //
    }
}
