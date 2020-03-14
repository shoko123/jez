<?php

namespace App\Http\Controllers;

use App\Models\Media\Scene;
use App\Models\Media\Sceneable;
use Illuminate\Http\Request;

class SceneController extends Controller
{
    //receives sceneabletype and sceneable_id in query string
    //returns scene item is in with related images.
    public function index(Request $request)
    {
        $scenes = Sceneable::select('scene_id', 'sceneable_type', 'sceneable_id')->with(
            [
                'scene' => function ($q) {
                    $q->select('id', 'description');
                    //$q->select('id', 'scene_id', 'image_no');
                },
                'scene.sceneables',
                'scene.images' => function ($q) {
                    $q->select('id', 'scene_id', 'image_no', 'extension');
                    //$q->select('id', 'scene_id', 'image_no');
                },

            ])->where('sceneable_type', '=', $request->input('sceneable_type'))
            ->where('sceneable_id', '=', $request->query('sceneable_id'))
            ->get();

        return response()->json([
            "scenes" => $scenes,
        ], 200);
    }

    //receives scene_id in query string
    //returns scene and related sceneables and images.
    public function show($id)
    {
        $scene = Scene::with(
            ['sceneables',
                'images',
            ])
            ->findOrFail($id);

        return response()->json([
            "scene" => $scene,
        ], 200);
    }

    public function store(Request $request)
    {

        \DB::transaction(function () use ($request) {
            $scene = new Scene;
            $scene->description = "my new scene";
            $scene->save();

            foreach ($request->sceneables as $scene_item) {
                $sceneable = new Sceneable;
                $sceneable->scene_id = $scene->id;
                $sceneable->sceneable_type = $scene_item["sceneable_type"];
                $sceneable->sceneable_id = $scene_item["sceneable_id"];
                $sceneable->save();
            }
        });

        return response()->json([
            "message" => "new scene created successfully",
        ], 200);
    }

    public function destroy($id)
    {
        $scene = Scene::findOrFail($id);
        if ($scene->delete()) {
            return response()->json([
                "message" => "scene deleted successfully",
            ], 200);
        }
    }

}
