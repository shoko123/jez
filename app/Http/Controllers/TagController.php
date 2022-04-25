<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

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

    public function syncModule(Request $request)
    {
        //basic validation and authorization
        $v = $request->validate([
            'digModel' => [Rule::in(['Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'id' => 'numeric',
            'tagsByType' => 'required|array',
        ]);

        $user = Auth::user();
        $permission = $v["digModel"] . "-tag";

        if (!$user->hasPermissionTo($permission, 'api')) {
            return response()->json([
                "message" => $user,
            ], 405);
        }

        $modelName = "App\\Models\\Tags\\" . $v["digModel"] . "TagType";
        //$modelName = "App\Models\Dig\\" . $v["digModel"];
        $model = new $modelName;
        $all = [];
        //$newTypesWithTags = ;
        //$existingTypesWithTags = [];
        foreach ($v["tagsByType"] as $x) {
            $group = $model->select('id', 'name')->with(['tags'  => function ($query) {
                $query->select('type_id', 'id', 'name');
            }])->find($x["tag_type_id"]);
            $tags = [];
            foreach ($group->tags as $t) {
                array_push($tags, [
                    "tag_id" => $t->id,
                    "inCurrent" => false,
                    "inNew" => in_array($t["id"], array_map(function ($y) {
                        return $y["id"];
                    }, $x["tags"])),
                ]);
            }
            array_push(
                $all,
                [
                    "group_id" => $group->id,
                    "group_name" => $group->name,
                    "tags" => $tags
                ]
            );


            // $item->syncTagsWithType(array_map(function ($y) {
            //     return $y->name;
            // }, $x->tags), $x->type);
        }

        $modelName = "App\\Models\\Tags\\" . $v["digModel"] . "Tag";
        $model = new $modelName;
        $currentTags = $model->whereHas('item', function ($sub) use ($v) {
            $sub->where('item_id', $v["id"]);
        })->get();

        $modelName = "App\\Models\\Dig\\" . $v["digModel"];
        $model = new $modelName;
        $itemWithTags = $model->with('module_tags')->select('id')->find($v["id"]);


        //$modelName = "App\Models\Dig\\" . $v["digModel"];
        //     $current = Appointment::whereHas('therapies', function ($sub) use ($request) {
        //         $sub->where('therapy_id', $request->therapy_id);
        //      })->with('therapies')->get();



        //after syncing tags return new tags to caller
        //$item = $digModelName::with('tags')->findOrFail($id);

        // $tagIds = [];

        // foreach ($item->tags as $tag) {
        //     array_push($tagIds, $tag->pivot->tag_id);
        // }
        //return new tagIds. (may be used to update local storage).
        return response()->json([
            "message" => "back from tag/syncModule()",
            "new" => $v["tagsByType"],
            "all" => $all,
            "itemWithTags" => $itemWithTags,
            "currentTags" => $currentTags
            //"exising" => $existingTypesWithTags
        ], 200);
    }


    public function lookups(Request $request)
    {
        function updatePreservationId($model, $item_id, $preservation_id)
        {
            DB::table('finds')->where('findable_type', $model)
                ->where('findable_id', $item_id)
                ->update(['preservation_id' => $preservation_id]);
        }

        //basic validation and authorization
        $v = $request->validate([
            'digModel' => 'in:Pottery,Lithic,Stone,Glass,Metal,Fauna,Flora',
            'id' => 'numeric',
            "list" => 'required',
        ]);

        $user = Auth::user();
        $permission = $v["digModel"] . "-tag";

        if (!$user->hasPermissionTo($permission, 'api')) {
            return response()->json([
                "message" => $user,
            ], 405);
        }

        $model = 'App\Models\Dig\\' . $v["digModel"];
        $item = $model::with('find')->find($v["id"]);

        foreach ($request["list"] as $x) {
            if ($x["column_name"] === "preservation_id") {
                updatePreservationId($v["digModel"], $v["id"], $x["id"]);
            } else {
                $item[$x["column_name"]] = $x["id"];
            }
        }
        $item->save();

        return response()->json([
            "**** back from lookup find_id" => "rom tag/lookups",
        ], 200);
    }
}
