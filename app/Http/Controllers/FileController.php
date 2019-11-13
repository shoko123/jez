<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;

class FileController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
           //get filename with extension
           $fileName = $request->file('file')->getClientOriginalName();

           //get filename without extension
           $fileNameNoExtension = pathinfo($fileName, PATHINFO_FILENAME);

           //get file extension
           $extension = $request->file('file')->getClientOriginalExtension();

           //filename to store
            $thumbnailFileName = $fileNameNoExtension . '_tn' . '.' . $extension;
           //Upload File
           $request->file('file')->storeAs('public/images/full', $fileName);
           $request->file('file')->storeAs('public/images/thumbnails', $thumbnailFileName);

           //Resize image here
           $thumbnailPath = public_path('storage/images/thumbnails/' . $thumbnailFileName);
           $img = Image::make($thumbnailPath)->resize(400, 150, function ($constraint) {
               $constraint->aspectRatio();
           });
           $img->save($thumbnailPath);



            ///
            //$request->file->store('images/full');           
        }
        return response()->json([
            "message" => "Done",
        ]);
    }

    public function storeMultiple(Request $request)
    {
        if (count($request->files)) {
            foreach ($request->files as $file) {
                $this->storeSingle($file);
            }
            return response()->json([
                "message" => "stored multiple files",
            ]);
        } else {
            return response()->json([
                "message" => "No files to store",
            ]);
        }
    }
    protected function storeSingle($file)
    {
        if ($request->hasFile('file')) {
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
   

}
