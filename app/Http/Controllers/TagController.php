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

        $tagIds = [];

        foreach ($item->tags as $tag) {
            array_push($tagIds, $tag->pivot->tag_id);
        }

        //return new tagIds. (may be used to update local storage).
        return response()->json([
            "tagIds" => $tagIds,
        ], 200);
    }
}
