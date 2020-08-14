<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Spatie\Tags\Tag;

use App\Models\TagType;

class TagController extends Controller
{
    public function sync(Request $request)
    {
        $digModelName = 'App\Models\Dig\\' . $request->input('digModel');
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
        $rowTags = \DB::table('tags')->where('type', 'LIKE', '%' . $moduleName . '%')->select('id', 'type', 'name')->get();
        $tags = $tagsByType = [];
        $typeCnt = 0;
        foreach ($rowTags as $key => $tag) {
            //$tag->name = substr(substr($tag->name, 8), 0, -2);
            array_push($tags, ['id' => $tag->id, 'name' => substr(substr($tag->name, 8), 0, -2), 'type' => $tag->type]);

            //find type
            $keys = array_column($tagsByType, 'type');         
            if (!in_array($tag->type, $keys)) {
                //push type into types array
                array_push($tagsByType, ['id'=> $typeCnt, 'type' => $tag->type, 'items' => []]);
                array_push($keys, $tag->type);
                $typeCnt++;
            }           
            $index = array_search($tag->type, $keys);
            if ($index !== false) {
                array_push($tagsByType[$index]['items'], ['id' => $tag->id, 'name' => substr(substr($tag->name, 8), 0, -2)]);
            }
        }

        $typesWithTags = TagType::with('tags')->orderBy('category')->orderBy('order_column')->get();
        //////////////////
        /*
        $moduleName = $request->input('moduleName');

        $tags = \DB::table('tags')->where('type', 'LIKE', '%' . $moduleName . '%')->select('id', 'type', 'name')->get();
        //$tags = Tag::all();//($moduleName)->select('id', 'type', 'name')->get();
        foreach ($tags as $tag) {
            $tag->name = substr(substr($tag->name, 8), 0, -2);
        }
        */
        return response()->json([
            "moduleName" => $moduleName,
            "tags" => $tags,
            "tagsByType" => $tagsByType,
            "typesWithTags" => $typesWithTags,
        ], 200);
    }
}
