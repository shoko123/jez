<?php

namespace App\Http\Controllers;

use App\Models\Image\Image as ImageModel;
use App\Models\Image\Scene;
use App\Models\Image\Sceneable;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class FileController extends Controller
{

    public function show($item_type, $item_id)
    {
        /*
        $locus = Locus::with(
            [   'area' => function ($q) {
                    $q->select('id', 'year', 'area');},
                'finds' => function ($q) {
                    $q->select('id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type', 'findable_id', 'description');},
                    'scenes', 'scenes.sceneables', 'scenes.images'
            ])->findOrFail($id);
       
        $id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $locus->{"id_string"} = $id_string;

        ///
        $scenes = $locus->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
            foreach ($scene->images as $image) {
                unset($image->scene_id);
            }
        }
        
        unset($locus->scenes);
        
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
          ];
          ////
        return response()->json([
            "locus" => $locus,
            "media" => $media,
        ], 200);
        */
    }


    public function storeMultiple(Request $request)
    {
        $count = count($request->myfiles);
        if ($count == 0) {
            return response()->json([
                "message" => "No files to store",
            ]);
        }
        //find/create scene
        $scene = json_decode($request["sceneData"]);
        $newScene = null;
        $scene_id = $scene->scene_id;
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

                //$video->tags()->save($tag);

            }
        }
        //find max image_no for this scene
        $maxImageNo = \DB::table('images')->where('scene_id', $scene_id)->max('image_no');

        //insert image records to scene

        //save files
        foreach ($request->myfiles as $key => $myfile) {

            $fileName = $myfile->getClientOriginalName();

            //get filename without extension
            $fileNameNoExtension = pathinfo($fileName, PATHINFO_FILENAME);

            //get file extension
            $extension = $myfile->getClientOriginalExtension();

            //filename to store
            $thumbnailFileName = $fileNameNoExtension . '_tn' . '.' . $extension;
            $img = new ImageModel;
            $img->scene_id = $scene_id;
            $img->image_no = $maxImageNo + $key + 1;
            $img->extension = $extension;
            $img->save();
            $image_id = $img->id;
            $nameFull = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '.'. $extension;
            $nameThumbnail = str_pad($img->id, 6, "0", STR_PAD_LEFT) . '_tn.'. $extension;
            


            $myfile->storeAs('public/DB/images/full', $nameFull);
            $myfile->storeAs('public/DB/images/thumbnails', $nameThumbnail);
            
            //Resize thumbnail
            $tn = Image::make(public_path('/storage/DB/images/thumbnails/') . $nameThumbnail)->resize(400, 150, function ($constraint) {
                $constraint->aspectRatio();
            });
            $tn->save();

            //watermark full
            /*
            $full = Image::make(public_path('/storage/DB/images/full/') . $nameFull)->text('my locus', 0, 0, function($font) {
                $font->size(24);
                $font->color('#fdf6e3');
                $font->align('center');
                $font->valign('middle');
            });
            $full->save();
            */          
        }

        return response()->json([
            "message" => "stored multiple files",
            "inScene" => $scene,
            "newScene" => $newScene,
            "maxImageNo" => $maxImageNo,
        ]);
    }
    protected function storeSingle($file)
    {

        //get filename with extension
        $filenamewithextension = $file->getClientOriginalName();

        //get filename without extension
        $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);

        //get file extension
        $extension = $file->getClientOriginalExtension();

        //filename to store
        $thumbnailFileName = $fileNameNoExtension . '_tn' . '.' . $extension;
        //Upload File
        $file->storeAs('public/images/full', $fileName);
        $file->storeAs('public/images/thumbnails', $thumbnailFileName);

        //Resize image here
        $thumbnailPath = public_path('storage/images/thumbnails/' . $thumbnailFileName);
        $img = Image::make($thumbnailPath)->resize(400, 150, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($thumbnailPath);

    }

}
