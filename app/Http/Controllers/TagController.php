<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TagController extends Controller
{
    public function sync(Request $request)
    {
        //basic validation and authorization
        $validatedRequest = $request->validate([
            'digModel' => [Rule::in(['Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'id' => 'numeric',
            'tagsByType' => 'required|array',
        ]);

        $user = Auth::user();
        $permission = $validatedRequest["digModel"] . "-tag";

        if (!$user->hasPermissionTo($permission, 'api')) {
            return response()->json([
                "message" => $user,
            ], 405);
        }

        $digModelName = 'App\Models\Dig\\' . $validatedRequest["digModel"];
        $id = $validatedRequest["id"];
        $item = $digModelName::findOrFail($id);

        $newTagsPerType = json_decode(json_encode($validatedRequest["tagsByType"]));

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
