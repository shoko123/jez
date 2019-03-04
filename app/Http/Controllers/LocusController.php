<?php

namespace App\Http\Controllers;

use App\Http\Resources\Locus as LocusResource;
//use App\http\Requests;
use App\Models\Locus;
use App\Models\Area;
//use App\Models\Finds\Find;
//use App\Models\Finds\Pottery\PotteryBasket;

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
        //$locus = Locus::locusWithArea($id);
        //$locus = Locus::with(['area', 'finds'])->find($id);

        $locus = Locus::with(
            ['area' => function ($query) {
                $query->select('id', 'year', 'area');},
             'finds',
             'finds.findable'])->find($id);


            /*
        foreach ($locus->finds as $find) {
           $pottery = $find->findable;
        }
        */
        //$locus->getRelations(); // get all the related models
        /*
        $locus.finds->loadMorph('findable', [
            PotteryBasket::class => ['PotteryBasket'],
            Pottery::class => ['pottery'],
            Fauna::class => ['fauna'],
        ]);
        /*
        $locus->getRelations()->loadMorph('findable', [
            PotteryBasket::class => ['PotteryBasket'],
            Pottery::class => ['pottery'],
            Fauna::class => ['fauna'],
        ]);
        */
        //$locus = App\Models\Locus::find($id);  
        //$locus = App\Models\Locus::with(['area', 'finds'])->get();


        if ($locus) {
            
            return response()->json([
                "locus" => $locus
            ], 200);

            //return new LocusResource($locus);
        } else {

            //return response()->json($response, 200);
            //abort(403, 'Locus not found;

            $data = 54;
            $error = array(
                "status" => "201",
                "source" => "Locus Model",
                "title" => "locus not found",
            );

            $response = array(
                'errors' => $error,
                'data' => $data,

            );

            return response()->json([
                'status' => 'error',
                'msg' => 'Locus not found',
            ], 422);
            //return response()->json($response);

        }

        //return $locus ? new LocusResource($locus) : response()->json([
        //    "error" => "locus not found",
        //], 200);
        //return $locus;
        return new LocusResource($locus);
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
/*
try {
$locus->save();
return $locus;
//code causing exception to be thrown
} catch(\Exception $e) {

return response()->json([
'errors' => array(
"status" => "404",
"source" => "Locus Model",
"title" => "a locus with tag already exists",
),
]);

}
 */
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
