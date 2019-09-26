<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Stone\Groundstone;
use Illuminate\Http\Request;

class GroundstoneController extends Controller
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
        $groundstones = Groundstone::select('id', 'description')->with(
            ['find.locus.area' => function ($q) {
                $q->select('id', 'year', 'area');
            },
            'find.locus' => function ($q) {
                $q->select('id', 'locus', 'area_id');
            },
            'find' => function ($q) {
                $q->select('id', 'findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'description');
            },
            'scenes' => function ($q) {
                $q->select('scene_id');
            },
            ])
            ->get();

        //add id_string to locus

        foreach ($groundstones as $groundstone) {

            $locus = $groundstone->find->locus;
            $find = $groundstone->find;

            $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
            $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 3, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 3, "0", STR_PAD_LEFT) : str_pad($find->item_no, 3, "0", STR_PAD_LEFT);
            $id_string = $locus_id_string . '.' . $find->registration_category . '.';

            //$groundstone->{"locus_id_string"} = $locus_id_string;
            
            $groundstone->{"locus_id"} = $locus->id;
            $groundstone->{"id_string"} = $id_string . $gs_basket_string;
            $groundstone->{"find_description"} = $find->description;
            unset($groundstone->find);
        }
        return response()->json([
            "groundstones" => $groundstones], 200);
        //return $groundstones;
    }

    public function stones2()
    {
        $groundstones = Groundstone::with(
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

        return $groundstones;
    }
/**
 * Display the specified resource.
 *
 * @param  \App\Models\Finds\Groundstone\Groundstone  $Groundstone
 * @return \Illuminate\Http\Response
 */
    public function show($id)
    {
        $groundstone = Groundstone::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus', 'description', 'area_id');},
                'find.locus.area', 'scenes', 'groundstone_type', 'material'])
            ->findOrFail($id)->load('scenes');

        //add id_string to locus
        $find = $groundstone->find;
        $locus = $find->locus;

        $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 2, "0", STR_PAD_LEFT);
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 2, "0", STR_PAD_LEFT);
        $id_string = $locus_id_string . '.' . $find->registration_category . '.';
        $area_id = $find->locus->area->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"locus_id_string"} = $locus_id_string;
        $find->{"area_id"} = $area_id;
        $groundstone->{"find_id"} = $find->id;
        $groundstone->{"area_id"} = $area_id;
        $groundstone->{"locus_id"} = $locus->id;
        $groundstone->{"id_string"} = $id_string . $gs_basket_string;

        unset($groundstone->find);
        unset($find->locus);
        /*
        //return $this->groundstone1($id);
        $groundstone = Groundstone::with(
        ['find',
        'find.locus' => function ($query) {
        $query->select('id', 'locus', 'description', 'area_id');},
        'find.locus.area', 'scenes', 'groundstone_type', 'material'])
        ->findOrFail($id)->load('scenes');

        //add id_string to locus
        $locus = $groundstone->find->locus;
        $find = $groundstone->find;

        $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 3, "0", STR_PAD_LEFT);
        $id_string = $locus_id_string . '.' . $find->registration_category . '.';
        $groundstone->find->{"locus_id_string"} = $locus_id_string;

        $groundstone->{"id_string"} = $id_string . $gs_basket_string;

        // works unset($groundstone->find->locus);
         */
        return response()->json([
            "groundstone" => $groundstone,
            "find" => $find,
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
            $groundstone = Groundstone::findOrFail($request->input('groundstone.id'));
            $find = Find::findOrFail($request->input('find.id'));
        } else {
            //$groundstone = $request->isMethod('put') ? Groundstone::findOrFail($request->id) : new Groundstone;
            $groundstone = new Groundstone;
            $find = new Find;
        }

        //if ($request->isMethod('put')) {
        //    $groundstone->id = $request->input('groundstone.id');
        //}
        $groundstone->groundstone_type_id = $request->input('groundstone.groundstone_type_id');
        $groundstone->material_id = $request->input('groundstone.material_id');
        $groundstone->weight = $request->input('groundstone.weight');
        $groundstone->notes = $request->input('groundstone.notes');
        $groundstone->measurements = $request->input('groundstone.measurements');

        //$groundstone->type = $request->input('groundstone.type');
        //$groundstone->type = $request->input('groundstone.type');
        //$groundstone->description = $request->input('groundstone.description');
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

        $find->findable_type = "Groundstone";

        //DB::transaction(function()  {
        //    $user->save();
        //});
        \DB::transaction(function () use ($request, $groundstone, $find) {
            $groundstone->save();

            if ($request->isMethod('post')) {
                $find->findable_id = $groundstone->id;
            }
            $find->save();
        });
        return response()->json([
            "msg" => "groundstone and find created succefully",
            "groundstone" => $groundstone,
            "find" => $find,
        ], 200);

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\Groundstone\Groundstone  $Groundstone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $groundstone = Groundstone::findOrFail($id);
        $find = $groundstone->find;
        if (!$find->delete()) {
            return response()->json([
                "msg" => "Failed to delete find",
            ], 200);
        }

        //Find::destroy($find->id);

        if (!$groundstone->delete()) {
            return response()->json([
                "msg" => "Failed to delete groundstone",
            ], 200);
        }
        return response()->json([
            "msg" => "both find + groundstone entries deleted",
            "groundstone" => $groundstone,
            "find" => $find,
        ], 200);
    }
}
