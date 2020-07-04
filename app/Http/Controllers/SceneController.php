<?php

namespace App\Http\Controllers;

use App\Models\Scene\Scene;
use App\Models\Scene\Sceneable;
use Illuminate\Http\Request;

class SceneController extends Controller
{
    //store or update scene with attached media files.
    //1 - check if scene already exists
    public function store(Request $request)
    {
        $count = count($request->media_files);
        if ($count == 0) {
            return response()->json([
                "message" => "Scene/store error - No files to store",
            ]);
        }

        //find/create scene
        $media_type = json_decode($request["media_type"]);
        $scene = json_decode($request["scene"]);

        $newScene = null;
        $scene_id = $scene->id;
        $isNewScene = ($scene_id == null) ? true : false;
        if ($isNewScene) {
            //create a new scene and its sceneable items
            $newScene = new Scene;
            $newScene->save();
            $scene_id = $newScene->id;
            //add items to scene
            foreach ($scene->sceneables as $item) {
                $sceneable = new Sceneable;
                $sceneable->sceneable_type = $item->sceneable_type;
                $sceneable->sceneable_id = $item->sceneable_id;
                $sceneable->scene_id = $newScene->id;
                $sceneable->save();
            }
        }
        //get scene model from database (should be there for either new or update).
        $scene = Scene::findOrFail($scene_id);

        //attach media to scene
        foreach ($request->media_files as $key => $media_file) {
            $this->storeMediaItem($media_file, $scene, $media_type);
        }

        //get scene with new media
        $scene = Scene::with(['sceneables', 'media'])->findOrFail($scene_id);

        return response()->json([
            "message" => "succesfully stored file(s)",
            "isNewScene" => $isNewScene,
            "media_type" => $media_type,
            "scene" => $scene,
        ]);
    }

    protected function storeMediaItem($media_file, $scene, $media_type)
    {
        $scene
            ->addMedia($media_file)
            ->toMediaCollection($media_type);

        /*
        $fileName = $media_file->getClientOriginalName();

        //get filename without extension
        $fileNameNoExtension = pathinfo($fileName, PATHINFO_FILENAME);

        //get file extension and standardized it (lower case, jpeg -> jpg).
        $extension = $media_file->getClientOriginalExtension();
        $extension = strtolower($extension);
        if ($extension == 'jpeg') {
        $extension = 'jpg';
        }

        //get date taken
        $date_taken  = Image::make($media_file)->exif('DateTimeOriginal');

        //save Image details (scene, date, no) as a record in the media table.
        $img = new MyMedia;
        $img->scene_id = $scene_id;
        $img->media_no = $media_no;
        $img->media_type = $media_type;
        $img->extension = $extension;
        $img->date_taken = ($date_taken == "0000:00:00 00:00:00") ? null : $date_taken;

        $img->save();

        //asseble physical media file name to store in filesystem.
        $image_id = $img->id;
        $nameFull = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '.' . $extension;
        $nameThumbnail = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $extension;

        //store
        $media_file->storeAs('public/DB/media/full', $nameFull);
        $media_file->storeAs('public/DB/media/thumbnails', $nameThumbnail);

        //Resize thumbnail
        $tn = Image::make(public_path('/storage/DB/media/thumbnails/') . $nameThumbnail)->resize(300, 300, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
        });
        $tn->save();

        //resize image if larger than 1.5 MB
        $full = Image::make(public_path('/storage/DB/media/full/') . $nameFull);
        if ($full->filesize() > 1500000) {
        $full->resize(1920, 1080, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
        });
        $full->save();
        }
         */
        //TODO watermark full image
        /*
        $full = Image::make(public_path('/storage/DB/media/full/') . $nameFull)->text('my locus', 0, 0, function($font) {
        $font->size(24);
        $font->color('#fdf6e3');
        $font->align('center');
        $font->valign('middle');
        });
        $full->save();
         */
        //return updated media (Scene, Illustration, or Plan)
    }

    public function deleteMediaItem($id)
    {
        $scene = Scene::with(
            ['sceneables',
            ])
            ->findOrFail($id);

        return response()->json([
            "scene" => $scene,
        ], 200);
    }

    public function index(Request $request)
    {
        $scenes = Sceneable::select('scene_id', 'sceneable_type', 'sceneable_id')->with(
            [
                'scene' => function ($q) {
                    $q->select('id', 'description');
                    //$q->select('id', 'scene_id', 'media_no');
                },
                'scene.sceneables',
            ])->where('sceneable_type', '=', $request->input('sceneable_type'))
            ->where('sceneable_id', '=', $request->query('sceneable_id'))
            ->get();

        return response()->json([
            "scenes" => $scenes,
        ], 200);
    }

    //receives scene_id in query string
    //returns scene and related sceneables and media.
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

    /*
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
     */

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
