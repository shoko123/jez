<?php

namespace App\Http\Controllers;

use App\Models\Scene;
use App\Models\Sceneable;
use Illuminate\Http\Request;

class SceneController extends Controller
{
    public function store(Request $request)
    {
       
    }

    public function show($id)
    {
        $scene = Scene::with(
            ['sceneables',
            ])
            ->findOrFail($id);

        return response()->json([
            "scene" => $scene,
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
