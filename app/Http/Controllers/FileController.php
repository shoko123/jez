<?php

namespace App\Http\Controllers;

use App\Models\Scene\MyMedia;
use App\Models\Scene;
use App\Models\Sceneable;
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

        //find max media_no for this scene
        $maxImageNo = \DB::table('mymedia')->where('scene_id', $scene_id)->max('media_no');

        //save files
        foreach ($request->media_files as $key => $media_file) {
            $this->storeSingle($media_file,  $scene_id, $maxImageNo + $key + 1, $media_type);
        }
        $scene = Scene::with(['sceneables', 'mymedia'])->findOrFail($scene_id);

        return response()->json([
            "message" => "succesfully stored file(s)",
            "isNewScene" => $isNewScene,
            "media_type" => $media_type,
            "scene" => $scene,
        ]);
    }

    protected function storeSingle($media_file, $scene_id, $media_no, $media_type)
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

    public function destroy(Request $request)
    {
        //the only thing we destroy is a single mediaItem at a time

        $mediaItem = MyMedia::with(
            ['scene', 'scene.mymedia'])->findOrFail($request->id);

        //storage_path() .
        $fullName = '/public/DB/media/full/' . str_pad($mediaItem->id, 6, "0", STR_PAD_LEFT) . '.' . $mediaItem->extension;
        $tnName = '/public/DB/media/thumbnails/' . str_pad($mediaItem->id, 6, "0", STR_PAD_LEFT) . '_tn.' . $mediaItem->extension;

        $scene = $message = null;
        $scene_id = $mediaItem->scene->id;
        if (count($mediaItem->scene->mymedia) === 1) {
            //we need to delete the scene in addition deleting the mediaItem.

            //delete all sceneables records r/t this scene.
            \DB::table('sceneables')->where('scene_id', $scene_id)->delete();

            //delete the single scene record.
            \DB::table('scenes')->where('id', $scene_id)->delete();
            
            //delete mediaItem record
            $mediaItem->delete();
            $message = "mediaItem and scene deleted successfully";
        } else {
            $message = "mediaItem only deleted successfully";
            
            //delete mediaItem record
            $mediaItem->delete();
            
            //return "updated" scene (missing one media file)
            $scene = Scene::with(['sceneables', 'mymedia'])->findOrFail($scene_id);
        }
               
        $filesExistedBeforeDelete = \Storage::exists($fullName);

        //delete physical mediaItem
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
