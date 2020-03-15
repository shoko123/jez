<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Pottery;
use App\Models\Finds\Stone;
use Illuminate\Http\Request;

class FindController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Find::count();
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
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function show(Find $find)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function edit(Find $find)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Find $find)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Find::findOrFail($id);

        if ($find->delete($id)) {
            return $find;
        }
    }

    public function image($id)
    {
        $find = Find::findOrFail($id);
        $instance = null;
        switch ($find->findable_type) {
            case 'Stone':
                $instance = Stone::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.media'])->findOrFail($find->findable_id);
                break;

            case 'Pottery':
                $instance = Pottery::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.media'])->findOrFail($find->findable_id);
                break;
        }

        //$class = '\App\Models\Finds\\' . $find->findable_type;
        //$instance = new $class();
        //$instance::findOrFail($find->findable_id);
        
        $media = $image = null;
        foreach ($instance->scenes as $scene) {
            if (count($scene->sceneables) == 1) {
                $media = $scene->media;
                break;
            }
        }

        $image = $media ? $media[0] : null;
        return response()->json([
            "image" => $image,
        ], 200);
    }

}
