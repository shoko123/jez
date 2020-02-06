<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoneRequest;

use App\Models\Finds\Find;
use App\Models\Finds\Stone;
use App\Models\Image\Scene;
use App\Models\Locus;


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
    //public function store(FindStoneRequest $request)
    public function store(StoneRequest $request)
    {
        $validated = $request->validated();

        //return response()->json([
        //    "validated"=> $validated,
        //], 200);

   if ($request->isMethod('put')) {
            $stone = Stone::findOrFail($validated["id"]);
            $find = Find::findOrFail($validated["find_id"]);
        } else {
            $stone = new Stone;
            $find = new Find;
            $find->findable_type = "Stone";
        }

        $stone->stone_type_id = $validated["stone_type_id"];
        $stone->material_id = $validated["material_id"];
        $stone->notes = $validated["stone_notes"];
        $stone->measurements = $validated["measurements"];
        $stone->weight = $validated["weight"];  
        
        
        $find->locus_id = $validated["locus_id"];
        $find->registration_category = $validated["registration_category"];
        $find->basket_no = $validated["basket_no"];
        $find->item_no = $validated["item_no"];
        $find->date = $validated["date"];
        $find->related_pottery_basket = $validated["related_pottery_basket"];
        $find->square = $validated["square"];
        $find->level_top = $validated["level_top"];
        $find->level_bottom = $validated["level_bottom"];
        $find->keep = $validated["keep"];
        $find->drawn = $validated["drawn"];
        $find->description = $validated["description"];
        $find->notes = $validated["notes"];
        $find->storage_location = $validated["storage_location"];

        $find->quantity = $validated["quantity"];
        
            /*
   
        $stone->stone_type_id = $request->input('stone_type_id');
        $stone->material_id = $request->input('material_id');
        $stone->notes = $request->input('stone_notes');
        $stone->measurements = $request->input('measurements');

        $find->locus_id = $request->input('locus_id');
        $find->registration_category = $request->input('registration_category');
        $find->basket_no = $request->input('basket_no');
        $find->item_no = $request->input('item_no');
        $find->date = $request->input('date');
        $find->related_pottery_basket = $request->input('related_pottery_basket');
        $find->square = $request->input('square');
        $find->level_top = $request->input('level_top');
        $find->level_bottom = $request->input('level_bottom');
        $find->keep = $request->input('keep');
        $find->drawn = $request->input('drawn');
        $find->description = $request->input('description');
        $find->notes = $request->input('notes');
        $find->storage_location = $request->input('storage_location');
        $find->periods = $request->input('periods');
        $find->quantity = $request->input('quantity');
        $find->weight = $request->input('weight');
        */
        \DB::transaction(function () use ($request, $stone, $find) {
            $stone->save();

            if ($request->isMethod('post')) {
                $find->findable_id = $stone->id;
            }
            $find->save();
        });

        if ($request->isMethod('post')) {
            //if new stone, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('area')->findOrFail($find->locus_id);
            $tag = $locus->area->year - 2000 . '/' . $locus->area->area . '/' . $locus->locus . '.' . $find->registration_category . '.';
            $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->item_no : $find->item_no;

            //{"id":700,"notes":null,"locus_id":839,"locus":217,"registration_category":"AR","basket_no":0,"item_no":10,"year":2018,"area":"S","tag":"18/S/217.AR.10"},
            //{"stone_type_id":2,"material_id":3,"weight":null,"notes":"xxx","measurements":"xxx","id":885,"tag":"12/K/0.AR.1"}]

            $stone->{"tag"} = $tag;
            $stone->{"locus_id"} = $find->locus_id;
            //$stone->{"registration_category"} =$find->locus_id;
            //$stone->{"basket_no"} =$find->locus_id;
            //$stone->{"item_no"} =$find->locus_id;

            unset($stone->stone_type_id);
            unset($stone->material_id);
            unset($stone->weight);
            unset($stone->measurements);

        }

        return response()->json([
            "msg" => "stone and find created succefully",
            "item" => $stone,
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
            "item" => $stone,
            "find" => $find,
        ], 200);
    }

    public function summary()
    {
        $itemCount = Stone::count();

        $imageCount = Scene::withCount(['images', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Stone');}])->get()->reduce(function ($carry, $item) {         
                $carry += ($item->sceneables_count > 0) ? $item->images_count : 0;
                return $carry;
            });

            $summary = (object)['itemCount' => $itemCount, 'imageCount' => $imageCount];
                
            return response()->json([
                "summary" => $summary],
                200);
    }
}
