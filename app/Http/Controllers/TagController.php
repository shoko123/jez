<?php

namespace App\Http\Controllers;

use App\Models\Finds\Stone;
use Illuminate\Http\Request;
use \Spatie\Tags\Tag;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $item = null;
        //$class = '\App\Models\Finds\\' . $find->findable_type;
        //$instance = new $class;

        switch ($request->input('item_type')) {
            case 'Fauna':
                $item = Fauna::findOrFail($request->input('item_id'));
                break;
            case 'Flora':
                $item = Flora::findOrFail($request->input('item_id'));
                break;
            case 'Glass':
                $item = Glass::findOrFail($request->input('item_id'));
                break;
            case 'Lithic':
                $item = Lithic::findOrFail($request->input('item_id'));
                break;
            case 'Metal':
                $item = Metal::findOrFail($request->input('item_id'));
                break;
            case 'Pottery':
                $item = Pottery::findOrFail($request->input('item_id'));
                break;
            case 'Stone':
                $item = Stone::findOrFail($request->input('item_id'));
                break;
            case 'Tbd':
                $item = Tbd::findOrFail($request->input('item_id'));
                break;
            default:
                return "Failed to create " . $request->input('item_type') . " item.";
        }
        //$stone = Stone::findOrFail($request->input('item_id'));

        $tags = $request->input('tags');

        foreach ($tags as $tag) {
            $item->tags()->attach(Tag::findOrCreate($tag{"name"}, $tag{"type"}));
        }

        return response()->json([
            "back from tagger" => "Hello"], 200);
    }

    public function index(Request $request)
    {
        $type_prefix = $request->input('type_prefix');

        $username = "rocky";

        $tags = \DB::table('tags')->where('type', 'LIKE', '%' . $type_prefix . '%')->select('id', 'type', 'name')->get();
        //$tags = Tag::all();//($type_prefix)->select('id', 'type', 'name')->get();
        foreach ($tags as $tag) {
            $tag->{"name"} = substr(substr($tag->{"name"}, 8), 0, -2);
        }
        return response()->json([
            "type_prefix" => $type_prefix,
            "tags" => $tags], 200);
    }
    /*
    public function allTagsForItem(Request $request)
    {
        $model_name = $request->input('model_name');
        $item_id = $request->input('item_id');

        $tagIds = \DB::table('taggables')
        ->distinct()
        ->select('tag_id')
        ->where('taggable_type', $model_name)
        ->get()
        ->pluck('tag_id');

        $tags = Tag::whereIn('id', $tagIds)->get();
         

        return response()->json([
            "tags" => $tags], 200);
    }
    */
}
