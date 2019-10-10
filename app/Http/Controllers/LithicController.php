<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LithicController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->lithics1();
    }

    public function lithics1()
    {
        $lithics = Lithic::select('id', 'notes')->with(
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

        foreach ($lithics as $lithic) {

            $locus = $lithic->find->locus;
            $find = $lithic->find;

            $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
            $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 3, "0", STR_PAD_LEFT) : str_pad($find->item_no, 3, "0", STR_PAD_LEFT);
            $id_string = $locus_id_string . '.' . $find->registration_category . '.';

            //$lithic->{"locus_id_string"} = $locus_id_string;

            $lithic->{"locus_id"} = $locus->id;
            $lithic->{"id_string"} = $id_string . $gs_basket_string;
            $lithic->{"description"} = $find->description;
            unset($lithic->find);
        }
        return response()->json([
            "lithics" => $lithics], 200);
        //return $lithics;
    }

    public function lithics2()
    {
        $lithics = Lithic::with(
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

        return $lithics;
    }
/**
 * Display the specified resource.
 *
 * @param  \App\Models\Finds\Lithic\Lithic  $Lithic
 * @return \Illuminate\Http\Response
 */
    public function show($id)
    {
        $lithic = Lithic::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus', 'description', 'area_id');},
                'find.locus.area', 'scenes', 'scenes.sceneables', 'lithic_type', 'material',
                'scenes.images',               
            ])
            ->findOrFail($id);


        //add id_string to locus
        $find = $lithic->find;
        $locus = $find->locus;

        $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 2, "0", STR_PAD_LEFT);
        $id_string = $locus_id_string . '.' . $find->registration_category . '.';
        $area_id = $find->locus->area->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"locus_id_string"} = $locus_id_string;
        $find->{"area_id"} = $area_id;
        $lithic->{"find_id"} = $find->id;
        $lithic->{"area_id"} = $area_id;
        $lithic->{"locus_id"} = $locus->id;
        $lithic->{"id_string"} = $id_string . $gs_basket_string;

        unset($lithic->find);
        unset($find->locus);

        return response()->json([
            "lithic" => $lithic,
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
            $lithic = Lithic::findOrFail($request->input('lithic.id'));
            $find = Find::findOrFail($request->input('find.id'));
        } else {
            //$lithic = $request->isMethod('put') ? Lithic::findOrFail($request->id) : new Lithic;
            $lithic = new Lithic;
            $find = new Find;
        }

        $lithic->lithic_type_id = $request->input('lithic.lithic_type_id');
        $lithic->material_id = $request->input('lithic.material_id');
        $lithic->weight = $request->input('lithic.weight');
        $lithic->notes = $request->input('lithic.notes');
        $lithic->measurements = $request->input('lithic.measurements');

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

        $find->findable_type = "Lithic";

        \DB::transaction(function () use ($request, $lithic, $find) {
            $lithic->save();

            if ($request->isMethod('post')) {
                $find->findable_id = $lithic->id;
            }
            $find->save();
        });
        return response()->json([
            "msg" => "lithic and find created succefully",
            "lithic" => $lithic,
            "find" => $find,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\Lithic\Lithic  $Lithic
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //TODO add transaction
        $lithic = Lithic::findOrFail($id);
        $find = $lithic->find;
        if (!$find->delete()) {
            return response()->json([
                "msg" => "Failed to delete find",
            ], 200);
        }

        //Find::destroy($find->id);

        if (!$lithic->delete()) {
            return response()->json([
                "msg" => "Failed to delete lithic",
            ], 200);
        }
        return response()->json([
            "msg" => "both find + lithic entries deleted",
            "lithic" => $lithic,
            "find" => $find,
        ], 200);
    }
}
