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

    public function sync(Request $request)
    {
        $digModelName = 'App\Models\Finds\\' . $request->input('digModel');
        $id = $request->input('id');
        $item = $digModelName::findOrFail($id);

        $newTagsPerType = json_decode(json_encode($request->input('tagsByType')));

        foreach ($newTagsPerType as $key => $x) {
            $item->syncTagsWithType(array_map(function ($y) {
                return $y->name;
            }, $x->tags), $x->type);
        }
        //after syncing tags return new tags to caller
        $item = $digModelName::with('tags')->findOrFail($id);

        $tags = [];

        foreach ($item->tags as $tag) {
            array_push($tags, ['id' => $tag->pivot->tag_id, 'name' => $tag->name, 'type' => $tag->type]);
        }

        return response()->json([
            "tags" => $tags], 200);
    }

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');

        $tags = \DB::table('tags')->where('type', 'LIKE', '%' . $moduleName . '%')->select('id', 'type', 'name')->get();
        //$tags = Tag::all();//($moduleName)->select('id', 'type', 'name')->get();
        foreach ($tags as $tag) {
            $tag->name = substr(substr($tag->name, 8), 0, -2);
        }
        return response()->json([
            "moduleName" => $moduleName,
            "tags" => $tags], 200);
    }
}
