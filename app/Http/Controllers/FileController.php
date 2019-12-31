<?php

namespace App\Http\Controllers;

use App\Models\Image\Image as ImageModel;
use App\Models\Image\Scene;
use App\Models\Image\Sceneable;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $count = count($request->myfiles);
        if ($count == 0) {
            return response()->json([
                "message" => "No files to store",
            ]);
        }
        //find/create scene
        //$scene = json_decode($request["info"]);
        $media = json_decode($request["media"]);
        $details = json_decode($request["details"]);
        $scene = $details->data;
        $newScene = null;
        $scene_id = $scene->scene_id;
        $isNewScene = ($scene->scene_id == null);
        if ($scene->scene_id == null) {
            //create a new scene
            $newScene = new Scene;
            $newScene->description = "new scene";
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
            //update "media" JSON that will be returned to caller.
        }

        //find max image_no for this scene
        $maxImageNo = \DB::table('images')->where('scene_id', $scene_id)->max('image_no');

        //save files
        foreach ($request->myfiles as $key => $myfile) {
            $this->storeSingle($myfile, $maxImageNo + $key + 1, $scene_id);
        }
        $scene = Scene::with(['sceneables', 'images'])->findOrFail($scene_id);
        return response()->json([
            "message" => "stored multiple files",
            "isNewScene" => $isNewScene,
            "scene" => $scene,
        ]);
    }
    
    protected function storeSingle($myfile, $image_no, $scene_id)
    {
        $fileName = $myfile->getClientOriginalName();

        //get filename without extension
        $fileNameNoExtension = pathinfo($fileName, PATHINFO_FILENAME);

        //get file extension
        $extension = $myfile->getClientOriginalExtension();
        $extension = strtolower($extension);
        if ($extension == 'jpeg') {
            $extension = 'jpg';
        }

        //filename to store
        $thumbnailFileName = $fileNameNoExtension . '_tn' . '.' . $extension;
        $img = new ImageModel;
        $img->scene_id = $scene_id;
        $img->image_no = $image_no;
        $img->extension = $extension;
        $img->save();
        $image_id = $img->id;
        $nameFull = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '.' . $extension;
        $nameThumbnail = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $extension;

        $myfile->storeAs('public/DB/images/full', $nameFull);
        $myfile->storeAs('public/DB/images/thumbnails', $nameThumbnail);

        //Resize thumbnail
        $tn = Image::make(public_path('/storage/DB/images/thumbnails/') . $nameThumbnail)->resize(400, 400, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $tn->save();

        //TODO watermark full image
        /*
        $full = Image::make(public_path('/storage/DB/images/full/') . $nameFull)->text('my locus', 0, 0, function($font) {
        $font->size(24);
        $font->color('#fdf6e3');
        $font->align('center');
        $font->valign('middle');
        });
        $full->save();
         */
        //return updated media (Scene, Illustration, or Plan)
    }

    public function destroy(Request $request)
    {
        //the only thing we destroy is a single image at a time

        //works...
        //$image = ImageModel::findOrFail($request->id);
        //
        $image = ImageModel::with(
            ['scene', 'scene.images'])->findOrFail($request->id);

        //storage_path() .
        $fullName = '/public/DB/images/full/' . str_pad($image->id, 6, "0", STR_PAD_LEFT) . '.' . $image->extension;
        $tnName = '/public/DB/images/thumbnails/' . str_pad($image->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $image->extension;

        $scene = $message = null;
        if (count($image->scene->images) === 1) {
            $scene_id = $image->scene->id;
            //need to delete scene in addition to image.
            \DB::table('sceneables')->where('scene_id', $image->scene->id)->delete();
            \DB::table('scenes')->where('id', $image->scene->id)->delete();
            $image->delete();
            $message = "image and scene deleted successfully";

        } else {
            $image->delete();
            $message = "image only deleted successfully";
            $scene = Scene::with(['sceneables', 'images'])->findOrFail($image->scene->id);
        }
        //delete physical image
        $exists = \Storage::exists($fullName);
        \Storage::delete($fullName);
        \Storage::delete($tnName);

        return response()->json([
            "message" => $message,
            "mediaType" => $request->mediaType,
            "id" => $request->id,
            "ImageModel" => $image,
            "scene" => $scene,
            "deletedSceneId" => null,
            "fullName" => $fullName,
            "tnName" => $tnName,
            "exists" => $exists,
        ]);
    }

}
