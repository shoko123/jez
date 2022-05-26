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
        $pilot = 'pilot';
        $pilotUrl = Storage::url($pilot);
        $visibility = Storage::getVisibility('pilot');
        $files = Storage::files('/app/about/');
        $time = Storage::lastModified('pilot');
        return response()->json([
            "FILESYSTEM_DISK" => env('FILESYSTEM_DISK'),
            "bucketUrl" => substr($pilotUrl, 0, str($pilotUrl)->length() - str($pilot)->length()),
            "visibility" => $visibility,
            "files in app folder" => $files,
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
