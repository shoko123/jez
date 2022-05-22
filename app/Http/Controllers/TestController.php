<?php

namespace App\Http\Controllers;

use App\Models\TestModel;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{
    private $model;

    public function __construct()
    {
        $this->model = new TestModel;
    }


    public function test1(Request $request)
    {
        $collection = $this->model->index($request->all());

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function testGetUrls(Request $r)
    {
        $modelName = "App\\Models\\Dig\\" . $r["model"];
        $model = new $modelName;
        $item = $model->findOrFail($r["id"]);

        $bucketUrl = 'http://127.0.0.1:9000/jezreel/media';
        $photos = $item->getMedia('photo');
        $media = [];

        foreach ($photos as $m) {
            array_push($media, [
                'publicUrl' => $m->getUrl(),
                'fullUrl' => $m->getFullUrl(),
                'tnUrl' => $m->getFullUrl('tn'),
                'hasMedia' => true,
                'media_id' => $m->id,
                'path' => $m->getPath(),
                'my_url' => $bucketUrl . $m->getPath(),
                'my_tn_url' => $bucketUrl . $m->getPath('tn'),

            ]);
        }


        return response()->json([
            "msg" => 'Good',
        ], 200);


        //return response($file, 200, $header);
    }

    public function test88(Request $r)
    {
        $modelName = "App\\Models\\Dig\\" . $r["model"];
        $model = new $modelName;
        $item = $model->findOrFail($r["id"]);

        $bucketUrl = 'http://127.0.0.1:9000/jezreel/media';
        $m = $item->getFirstMedia('photo');
        $media = [];


        array_push($media, [
            'publicUrl' => $m->getUrl(),
            'fullUrl' => $m->getFullUrl(),
            'tnUrl' => $m->getFullUrl('tn'),
            'media_id' => $m->id,
            'path' => $m->getPath(),
            'my_url' => $bucketUrl . $m->getPath(),
            'my_tn_url' => $bucketUrl . $m->getPath('tn'),
            'media' => $media
        ]);



        return response()->json([
            "msg" => 'Good',
            "media_details" => $media
        ], 200);


        //return response($file, 200, $header);
    }

    public function test(Request $r)
    {
        $a =  'media/' . str($r->id)->padLeft(5, '0');
        return $a;
        return response()->json([
            'message' => 'I am test',
            'pad' => $a,
        ], 200);    

        $name = $r->file('image')->getClientOriginalName();
        //$this->mimeType = $r->file('uploaded_file')->getMimeType();
        //$extension = $r->file('uploaded_file')->getClientOriginalExtension();
        //$fileName = $name . '.' . $extension;

        $path = Storage::disk('minio')->putFileAs('my_new_folder', $r->file('image'), $name);
        //$path = Storage::putFileAs('uploads', $r->file('uploaded_file'), $name);

        return response()->json([
            'message' => 'I am test',
            'path' => $path,
        ], 200);    
        //return back()->with("Success! path", $path);

        try {
             $name = $r->file('image')->getClientOriginalName();
             $path = $r->file('image')->storeAs(
                'avatars', $name, 'minio'
            );


            return response()->json([
                'message' => 'message',
                "path" => $path,
            ], 200);
        } catch (\Exception $error) {
            return response()->json(["error" => $error->getMessage()], 500);
        }



        $headers = ['Content-Type' => 'image/jpeg'];
        //Storage::disk('minio')->put('bbb.jpg', file_get_contents($r->file('image')));
        //$e = Storage::disk('minio')->url('Area0.jpg');
       
        //$extension = $r->file('image')->getClientOriginalExtension();
        //$fileName = $name . '.' . $extension;

        //Storage::disk('minio')->delete('test/Area0.jpg');

    }
}
