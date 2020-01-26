<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Finds\Find;
use App\Models\Finds\Stone;

class StoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->stones($request);
    }

    public function stones(Request $request)
    {
        $stones = \DB::table('finds')
            ->join('stones', 'finds.findable_id', '=', 'stones.id')
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas', 'loci.area_id', '=', 'areas.id')
            ->orderBy('loci.area_id')
            ->orderBy('loci.locus')
            ->where('finds.findable_type', '=', 'Stone')
            ->select('stones.id', 'stones.notes', 'loci.id AS locus_id', 'loci.locus', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas.year AS year', 'areas.area AS area')
            ->get();

        foreach ($stones as $stone) {
            $tag = $stone->year - 2000 . '/' . $stone->area . '/' . $stone->locus . '.' . $stone->registration_category . '.';
            $tag .= ($stone->registration_category == "GS") ? $stone->basket_no . '.' . $stone->item_no : $stone->item_no;
            $stone->{"tag"} = $tag;
        }

        return response()->json([
            "collection" => $stones], 200);
    }

/**
 * Display the specified resource.
 *
 * @param  \App\Models\Finds\Stone  $Stone
 * @return \Illuminate\Http\Response
 */
    public function show($id)
    {
        $stone = Stone::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus', 'description', 'area_id');},
                'find.locus.area', 'scenes', 'scenes.sceneables', 'stone_type', 'material',
                'scenes.images',
            ])
            ->findOrFail($id);

        //add tag to locus
        $find = $stone->find;
        $locus = $find->locus;

        $tag = $locus->area->year - 2000 . '/' . $locus->area->area . '/' . $locus->locus . '.' . $find->registration_category . '.';
        $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->item_no : $find->item_no;
        $stone->{"tag"} = $tag;
  
        $area_id = $find->locus->area->id;
        $find->{"locus_id"} = $locus->id;

        $find->{"area_id"} = $area_id;
        $stone->{"find_id"} = $find->id;
        $stone->{"locus_id"} = $locus->id;
        $stone->{"area_id"} = $area_id;

        $scenes = $stone->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
        }

        //$media->{"scenes"}  = $scenes;

        unset($stone->find);
        unset($stone->scenes);
        unset($stone->material_id);
        unset($stone->stone_type_id);

        unset($find->locus);
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
        ];
        return response()->json([
            "item" => $stone,
            "find" => $find,
            "media" => $media,
        ], 200);
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
        if ($request->isMethod('put')) {
            $stone = Stone::findOrFail($request->input('stone.id'));
            $find = Find::findOrFail($request->input('find.id'));
        } else {
            //$stone = $request->isMethod('put') ? Stone::findOrFail($request->id) : new Stone;
            $stone = new Stone;
            $find = new Find;
            $find->findable_type = "Stone";
        }

        $stone->stone_type_id = $request->input('stone.stone_type_id');
        $stone->material_id = $request->input('stone.material_id');
        $stone->weight = $request->input('stone.weight');
        $stone->notes = $request->input('stone.notes');
        $stone->measurements = $request->input('stone.measurements');

        $find->locus_id = $request->input('find.locus_id');
        $find->registration_category = $request->input('find.registration_category');
        $find->basket_no = $request->input('find.basket_no');
        $find->item_no = $request->input('find.item_no');
        $find->date = $request->input('find.date');
        $find->related_pottery_basket = $request->input('find.related_pottery_basket');
        $find->square = $request->input('find.square');
        $find->level_top = $request->input('find.level_top');
        $find->level_bottom = $request->input('find.level_bottom');
        $find->keep = $request->input('find.keep');
        $find->drawn = $request->input('find.drawn');
        $find->description = $request->input('find.description');
        $find->notes = $request->input('find.notes');
        $find->storage_location = $request->input('find.storage_location');
        $find->periods = $request->input('find.periods');

        $find->quantity = $request->input('find.quantity');
        $find->weight = $request->input('find.weight');



        \DB::transaction(function () use ($request, $stone, $find) {
            $stone->save();

            if ($request->isMethod('post')) {
                $find->findable_id = $stone->id;
            }
            $find->save();
        });
        return response()->json([
            "msg" => "stone and find created succefully",
            "stone" => $stone,
            "find" => $find,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //TODO add transaction
        $stone = Stone::findOrFail($id);
        $find = $stone->find;
        if (!$find->delete()) {
            return response()->json([
                "msg" => "Failed to delete find",
            ], 200);
        }

        //Find::destroy($find->id);

        if (!$stone->delete()) {
            return response()->json([
                "msg" => "Failed to delete stone",
            ], 200);
        }
        return response()->json([
            "msg" => "both find + stone entries deleted",
            "stone" => $stone,
            "find" => $find,
        ], 200);
    }
}
