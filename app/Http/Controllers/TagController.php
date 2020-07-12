<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Spatie\Tags\Tag;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $itemModelName = 'App\Models\Finds\\' . $item_type;
        $item = $itemModelName::findOrFail($item_id);
        $tags = $request->input('tags');

        foreach ($tags as $tag) {
            $item->tags()->attach(Tag::findOrCreate($tag{"name"}, $tag{"type"}));
        }

        return response()->json([
            "back from tagger" => "Hello"], 200);
    }

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');

        $tags = \DB::table('tags')->where('type', 'LIKE', '%' . $moduleName . '%')->select('id', 'type', 'name')->get();
        //$tags = Tag::all();//($moduleName)->select('id', 'type', 'name')->get();
        foreach ($tags as $tag) {
            $tag->{"name"} = substr(substr($tag->{"name"}, 8), 0, -2);
        }
        return response()->json([
            "moduleName" => $moduleName,
            "tags" => $tags], 200);
    }
}
