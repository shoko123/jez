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
    public function stam(Request $request)
    {
        if ($request->hasFile('file')) {
            //get filename with extension
            $filenamewithextension = $request->file('profile_image')->getClientOriginalName();

            //get filename without extension
            $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);

            //get file extension
            $extension = $request->file('profile_image')->getClientOriginalExtension();

            //filename to store
            $filenametostore = $filename . '_' . time() . '.' . $extension;

            //Upload File
            $request->file('profile_image')->storeAs('public/profile_images', $filenametostore);
            $request->file('profile_image')->storeAs('public/profile_images/thumbnail', $filenametostore);

            //Resize image here
            $thumbnailpath = public_path('storage/profile_images/thumbnail/' . $filenametostore);
            $img = Image::make($thumbnailpath)->resize(400, 150, function ($constraint) {
                $constraint->aspectRatio();
            });
            $img->save($thumbnailpath);

            return redirect('images')->with('success', "Image uploaded successfully.");
        }
    }

}
