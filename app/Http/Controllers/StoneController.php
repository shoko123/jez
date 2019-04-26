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
        return $this->stones2();

    }

    public function stones1()
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

        return $stones;
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
        //->get()->load('scenes');
            ->paginate(10);

        return $stones;
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
        //$stone = $request->isMethod('put') ? Stone::findOrFail($request->id) : new Stone;
        $stone = new Stone;
        $find = new Find;

        $stone->description = $request->input('stone.description');
        $stone->notes = $request->input('stone.notes');
        $stone->type = $request->input('stone.type');

        if (!$stone->save()) {
            return response()->json([
                "msg" => "Failed to save stone",
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
        $find->findable_type = "Stone";
        $find->findable_id = $stone->id;

        if (!$find->save()) {
            return response()->json([
                "msg" => "Failed to save find",
            ], 200);
        }

        return response()->json([
            "msg" => "stone and find created succefully",
            "stone" => $stone,
            "find" => $find,
        ], 200);

        /*
    $stone->id = $request->input('id');
    $stone->title = $request->input('title');
    $stone->body = $request->input('body');
    if ($stone->save()) {
    return $stone;
    }
     */
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
                'find.locus.area', 'scenes'])
            ->findOrFail($id)->load('scenes');

        return response()->json([
            "stone" => $stone,
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
