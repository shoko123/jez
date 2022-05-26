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
    public function url() {

        $pilotUrl = Storage::url('pilot');
        $visibility = Storage::getVisibility('pilot');
        $files = Storage::files('/app/about/');
        $time = Storage::lastModified('pilot');
        return response()->json([
            "pilotUrl" => $pilotUrl,
            "visibility" => $visibility,
            "files" => $files,
            "time" => $time
        ], 200);
    }  
    
    public function store(Request $r)
    {   
        $name = $r->file('image')->getClientOriginalName();
        $path = Storage::disk('do')->putFileAs('uploads', $r->file('image'), $name);

        return response()->json([
            "path" => $path
        ], 200);
    } 

    
}
