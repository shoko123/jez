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
        $count = count($request->media_files);
        if ($count == 0) {
            return response()->json([
                "message" => "No files to store",
            ]);
        }
        //find/create scene
        $media_type = json_decode($request["media_type"]);
        $scene = json_decode($request["scene"]);

        $newScene = null;
        $scene_id = $scene->id;
        $isNewScene = ($scene_id == null) ? true : false;
        if ($isNewScene) {
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
        foreach ($request->media_files as $key => $media_file) {
            $this->storeSingle($media_file, $maxImageNo + $key + 1, $scene_id);
        }
        $scene = Scene::with(['sceneables', 'images'])->findOrFail($scene_id);

        return response()->json([
            "message" => "stored multiple files",
            "isNewScene" => $isNewScene,
            "media_type" => $media_type,
            "scene" => $scene,
        ]);
    }

    protected function storeSingle($media_file, $image_no, $scene_id)
    {
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

        //save Image details (scene, date, no) as a record in the images table.
        $img = new ImageModel;
        $img->scene_id = $scene_id;
        $img->image_no = $image_no;
        $img->date_taken = ($date_taken == "0000:00:00 00:00:00") ? null : $date_taken;
        $img->extension = $extension;
        $img->save();

        //asseble physical media file name to store in filesystem.
        $image_id = $img->id;
        $nameFull = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '.' . $extension;
        $nameThumbnail = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $extension;

        
        //store
        $media_file->storeAs('public/DB/images/full', $nameFull);
        $media_file->storeAs('public/DB/images/thumbnails', $nameThumbnail);

        //Resize thumbnail
        $tn = Image::make(public_path('/storage/DB/images/thumbnails/') . $nameThumbnail)->resize(300, 300, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $tn->save();

        //resize image if larger than 1.5 MB
        $full = Image::make(public_path('/storage/DB/images/full/') . $nameFull);
        if ($full->filesize() > 1500000) {
            $full->resize(1920, 1080, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $full->save();
        }

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

        $image = ImageModel::with(
            ['scene', 'scene.images'])->findOrFail($request->id);

        //storage_path() .
        $fullName = '/public/DB/images/full/' . str_pad($image->id, 6, "0", STR_PAD_LEFT) . '.' . $image->extension;
        $tnName = '/public/DB/images/thumbnails/' . str_pad($image->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $image->extension;

        $scene = $message = null;
        $scene_id = $image->scene->id;
        if (count($image->scene->images) === 1) {
            //we need to delete the scene in addition deleting the image.

            //delete all sceneables records r/t this scene.
            \DB::table('sceneables')->where('scene_id', $scene_id)->delete();

            //delete the single scene record.
            \DB::table('scenes')->where('id', $scene_id)->delete();
            
            //delete image record
            $image->delete();
            $message = "image and scene deleted successfully";
        } else {
            $message = "image only deleted successfully";
            
            //delete image record
            $image->delete();
            
            //return "updated" scene (missing one media file)
            $scene = Scene::with(['sceneables', 'images'])->findOrFail($scene_id);
        }
               
        $filesExistedBeforeDelete = \Storage::exists($fullName);

        //delete physical image
        \Storage::delete($fullName);
        \Storage::delete($tnName);

        //we must return the update scene - it will be copied to the store
        return response()->json([
            "message" => $message,
            "media type" => $request->mediaType,
            "id" => $request->id,
            "scene" => $scene,
            "scene_id" => $scene_id,
            "name" => $fullName,
            "files existed before delete" => $filesExistedBeforeDelete,
        ]);
    }

}
