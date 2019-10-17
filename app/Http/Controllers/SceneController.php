<?php

namespace App\Http\Controllers;

use App\Models\Image\Sceneable;
use App\Models\Image\Scene;
use Illuminate\Http\Request;

class SceneController extends Controller
{
    public function show(Request $request)
    {

        $scenes = Sceneable::select('scene_id', 'sceneable_type', 'sceneable_id')->with(
            [
                'scene' => function ($q) {
                    $q->select('id', 'description');
                    //$q->select('id', 'scene_id', 'image_no');
                }, 
                'scene.sceneables',
                'scene.images'=> function ($q) {
                    $q->select('id', 'scene_id', 'image_no', 'extension');
                    //$q->select('id', 'scene_id', 'image_no');
                },
                
            ])->where('sceneable_type', '=', $request->input('sceneable_type'))
            ->where('sceneable_id', '=', $request->query('sceneable_id'))
            ->get();

        return response()->json([
            "scenes" => $scenes,
        ], 200);
    }
    /*
    public function index()
    {
    //since we need to sort by foreign table columns, we must use a joint
    $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
    ->orderBy('areas.year', 'asc')
    ->orderBy('areas.area', 'asc')
    ->orderBy('loci.locus', 'asc')
    ->get(array('loci.id', 'loci.locus', 'loci.area_id', 'loci.description', 'areas.year', 'areas.area'));

    //format response, add id_string
    foreach ($loci as $locus) {
    $id_string = $locus->year - 2000 . '.' . $locus->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
    $locus->{"id_string"} = $id_string;
    unset($locus->locus);
    unset($locus->year);
    unset($locus->area);
    }

    return response()->json([
    "loci" => $loci], 200);
    }

     */

    public function store(Request $request)
    {
        if ($request->isMethod('put')) {
            $locus = Locus::findOrFail($request->input('id'));
        } else {
            $locus = new Locus;
        }

        //$locus->id = $request->id;
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

        //$locus = $request->input('locus');
        $locus->save();

        return response()->json([
            "locus" => $locus,
        ], 200);

    }

    public function destroy($id)
    {
        $locus = Locus::findOrFail($id);
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }

}
