<?php

namespace App\Http\Controllers;

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

    public function stones1() {
        $stones = Stone::with(
            ['find' => function ($q) {
                $q->select('id', 'findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'item_no');
            },
            'find.locus' => function ($query) {
                $query->select('id', 'locus', 'area_id');
            },
            'find.locus.area'  => function ($q) {
                $q->select('id', 'year', 'area');
            },
            'scenes'])
            ->get()->load('scenes');
            
        return $stones;
    }

    public function stones2() {
        $stones = Stone::with(
            ['find' => function ($q) {
                $q->select('id', 'findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'item_no');
            },
            'find.locus' => function ($query) {
                $query->select('id', 'locus', 'area_id');
            },
            'find.locus.area'  => function ($q) {
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
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Finds\Stone\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function edit(Stone $stone)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Finds\Stone\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stone $Stone)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\Stone\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stone $stone)
    {
        //
    }
}
