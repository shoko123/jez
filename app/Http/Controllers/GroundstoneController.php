<?php

namespace App\Http\Controllers;

use App\Models\Finds\Stone\Groundstone;
use Illuminate\Http\Request;
use App\Models\Finds\Find;

class GroundstoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->groundstones();

    }

    

    public function groundstones()
    {
        $groundstones = Groundtone::with(
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

   
    public function store(Request $request)
    {
        //$groundstone = $request->isMethod('put') ? Stone::findOrFail($request->id) : new Stone;
        $groundstone = new Groundstone;

        $groundstone->description = $request->input('stone.description');
        $groundstone->notes = $request->input('stone.notes');
        $groundstone->type = $request->input('stone.type');
        $groundstone->save();
        
        return response()->json([
            "groundstone.store.request" => $request,
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
     * @param  \App\Models\Finds\Stone\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $groundstone = Stone::with(
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
     * @param  \App\Models\Finds\Stone\Stone  $Stone
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
            "find" => $find
        ], 200);
    }
}
