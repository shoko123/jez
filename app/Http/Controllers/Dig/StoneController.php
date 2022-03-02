<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\StoneStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Locus;
use App\Models\Dig\Stone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StoneController extends BaseDigModuleController
{
    public function __construct(Stone $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', $this->model);

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
        $this->authorize('view', $this->model);
        $item = $this->model->show($id);
        return response($item, 200);
    }

    public function store(StoneStoreRequest $stoneRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedStone = $stoneRequest->validated();

        if ($stoneRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current stone+find
            $item = Stone::findOrFail($stoneRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Stone', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Stone;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedStone["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        DB::transaction(function () use ($stoneRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($stoneRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                DB::table('finds')->where('findable_type', 'Stone')->where('findable_id' , $item->id)->insert($find->toArray());
            } else {
                DB::table('finds')->where('findable_type', 'Stone')->where('findable_id' , $item->id)->update($find->toArray());
            }
        });

        if ($stoneRequest->isMethod('post')) {
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $item->dot = $locus->areaSeason->dot . '.' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->basket_no . '.' . $find->artifact_no;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "stone and find stored succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dig\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        DB::transaction(function () use ($id) {
            $stone = Stone::findOrFail($id);
            $find = Find::where(['findable_type' => 'Stone', 'findable_id' => $stone->id]);
            $stone->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "stone and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
