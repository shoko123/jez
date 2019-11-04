<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Stone\Stone;
use Illuminate\Http\Request;

class StoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->stones1();
    }

    public function stones1()
    {
        $stones = Stone::select('id', 'notes')->with(
            ['find.locus.area' => function ($q) {
                $q->select('id', 'year', 'area');
            },
                'find.locus' => function ($q) {
                    $q->select('id', 'locus', 'area_id');
                },
                'find' => function ($q) {
                    $q->select('id', 'findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'description');
                },
                'scenes.images'=> function ($q) {
                    $q->select('id', 'scene_id', 'image_no');
                },
            ])
            ->get();

        //add id_string to locus

        foreach ($stones as $stone) {

            $locus = $stone->find->locus;
            $find = $stone->find;

            $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
            $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 3, "0", STR_PAD_LEFT) : str_pad($find->item_no, 3, "0", STR_PAD_LEFT);
            $id_string = $locus_id_string . '.' . $find->registration_category . '.';

            //$stone->{"locus_id_string"} = $locus_id_string;

            $stone->{"locus_id"} = $locus->id;
            $stone->{"id_string"} = $id_string . $gs_basket_string;
            $stone->{"description"} = $find->description;
            unset($stone->find);
        }
        return response()->json([
            "stones" => $stones], 200);
        //return $stones;
    }

    public function stones2()
    {
        $stones = Stone::with(
            ['find' => function ($q) {
                $q->select('id', 'findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'item_no');
            },
                'find.locus' => function ($query) {
                    $query->select('id', 'locus', 'area_id');
                },
                'find.locus.area' => function ($q) {
                    $q->select('id', 'year', 'area');
                },
                'scenes'])
            ->get()->load('scenes');
        //->paginate(10);

        return $stones;
    }
/**
 * Display the specified resource.
 *
 * @param  \App\Models\Finds\Stone\Stone  $Stone
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


        //add id_string to locus
        $find = $stone->find;
        $locus = $find->locus;
        

        $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 2, "0", STR_PAD_LEFT);
        $id_string = $locus_id_string . '.' . $find->registration_category . '.';
        $area_id = $find->locus->area->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"locus_id_string"} = $locus_id_string;
        $find->{"area_id"} = $area_id;
        $stone->{"find_id"} = $find->id;
        $stone->{"area_id"} = $area_id;
        $stone->{"locus_id"} = $locus->id;
        $stone->{"id_string"} = $id_string . $gs_basket_string;
        
        $scenes = $stone->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
        }
        
        //$media->{"scenes"}  = $scenes;
        
        unset($stone->find);
        unset($stone->scenes);
        unset($find->locus);
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
          ];
        return response()->json([
            "stone" => $stone,
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

        $find->findable_type = "Stone";

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
     * @param  \App\Models\Finds\Stone\Stone  $Stone
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
