<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\LithicStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Lithic;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \Spatie\Tags\Tag;
use Illuminate\Support\Facades\DB;

class LithicController extends BaseDigModuleController
{
    public function __construct(Lithic $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $collection = $this->model->indexForFinds($request->all());

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function chunkMedia(Request $request)
    {
        //TODO validate!

        return response()->json([
            "collection" => $this->model->baseChunkMedia($request["ids"]),
        ], 200);
    }

    public function chunkTable(Request $request)
    {
        return response()->json([
            "collection" => $this->model->baseChunkTable($request["ids"]),
        ], 200);
    }

    public function show($id)
    {
        $item = $this->model->baseShow($id);
        return response($item, 200);
    }

    public function store(LithicStoreRequest $lithicRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $lithicRequest->validated();

        if ($lithicRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current lithic+find
            $item = Lithic::findOrFail($lithicRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Lithic', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Lithic;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        DB::transaction(function () use ($lithicRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($lithicRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                DB::table('finds')->where(['findable_type' => 'Lithic', 'findable_id' => $item->id])->insert($find->toArray());
            } else {
                DB::table('finds')->where(['findable_type' => 'Lithic', 'findable_id' => $item->id])->update($find->toArray());
            }
        });

        if ($lithicRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
            $tag .= ($find->registration_category == "FL") ? $find->basket_no . '.' . $find->artifact_no : $find->artifact_no;

            $item->tag = $tag;
            $item->locus_id = $find->locus_id;

            unset($item->weight);
            unset($item->notes);
        }

        return response()->json([
            "msg" => "lithic and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        DB::transaction(function () use ($id) {
            $lithic = Lithic::findOrFail($id);
            $find = Find::where(['findable_type' => 'Lithic', 'findable_id' => $lithic->id]);
            $lithic->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "lithic and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
