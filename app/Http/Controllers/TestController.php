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
    public function url()
    {
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

    public function totals()
    {
        $modelNames = ['Locus', 'Pottery', 'Stone', 'Lithic', 'Glass', 'Metal', 'Fauna'];
        $totals = [];
        $counts = [];
        foreach ($modelNames as $modelName) {

            $modelFullName = 'App\Models\Dig\\' . $modelName;
            $tagsFullName = 'App\Models\Tags\\' . $modelName . 'Tag';
            $tagTypeFullName = 'App\Models\Tags\\' . $modelName . 'TagType';
            $model = new $modelFullName;
            $tag = new $tagsFullName;
            $tag_type = new $tagTypeFullName;
            $table_name = $model->getTable();
            $pivot_name = $model->module_tags()->getTable();
           
            array_push($totals, [
                'name' => $modelName,
                'table_name' => $table_name,
                'item_cnt' => $model->count(),
                'tag_type_cnt' => $tag_type->count(),
                'tag_cnt' => $tag->count(),
                'global_tag_cnt' => DB::table('taggables')->where('taggable_type', $modelName)->count(),
                'model_tag_cnt' => DB::table($pivot_name)->count(),
                'media_cnt' => DB::table('media')->where('model_type', $modelName)->count(),
            ]);
        }

        foreach ($totals as $t) {
            $line = $t["name"] . ': cnt(' . $t["item_cnt"] . ') global_tags(' . $t["global_tag_cnt"] . ') model_tags(' . $t["model_tag_cnt"] . ') media(' . $t["media_cnt"] . ') tag_types(' . $t["tag_type_cnt"] . ') tags(' . $t["tag_cnt"] . ')';
            array_push($counts, $line);
        }

        return response()->json([
            //"totals" => $totals,
            "counts" => $counts
        ], 200);
    }
}
