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
        return $this->stones2();

    }

    public function stones1()
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

        return $groundstones;
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
            $find = Find::findOrFail($groundstone->id);
        } else {
            //$groundstone = $request->isMethod('put') ? Groundstone::findOrFail($request->id) : new Groundstone;
            $groundstone = new Groundstone;
            $find = new Find;
        }

        $groundstone->description = $request->input('groundstone.description');
        $groundstone->notes = $request->input('groundstone.notes');
        $groundstone->type = $request->input('groundstone.type');

        if ($request->isMethod('put')) {
            $groundstone->id = $request->input('groundstone.id');
        }

        if (!$groundstone->save()) {
            return response()->json([
                "msg" => "Failed to save groundstone",
            ], 200);
        }

        $find->locus_id = $request->input('find.locus_id');
        $find->registration_category = $request->input('find.registration_category');
        $find->basket_no = $request->input('find.basket_no');
        $find->item_no = $request->input('find.item_no');
        $find->related_pottery_basket = $request->input('find.related_pottery_basket');
        $find->date = $request->input('find.date');
        $find->description = $request->input('find.description');
        $find->notes = $request->input('find.notes');
        $find->square = $request->input('find.square');
        $find->periods = $request->input('find.periods');
        $find->keep = $request->input('find.keep');
        $find->level_top = $request->input('find.level_top');
        $find->level_bottom = $request->input('find.level_bottom');
        $find->quantity = $request->input('find.quantity');
        $find->weight = $request->input('find.weight');
        $find->findable_type = "Groundstone";
        if ($request->isMethod('put')) {
            $groundstone->id = $request->input('groundstone.id');
        } else {
            $find->findable_id = $groundstone->id;
        }
        if (!$find->save()) {
            return response()->json([
                "msg" => "Failed to save find",
            ], 200);
        }

        return response()->json([
            "msg" => "groundstone and find created succefully",
            "groundstone" => $groundstone,
            "find" => $find,
        ], 200);

        /*
    $groundstone->id = $request->input('id');
    $groundstone->title = $request->input('title');
    $groundstone->body = $request->input('body');
    if ($groundstone->save()) {
    return $groundstone;
    }
     */
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
                'find.locus.area', 'scenes'])
            ->findOrFail($id)->load('scenes');

        return response()->json([
            "groundstone" => $groundstone,
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
