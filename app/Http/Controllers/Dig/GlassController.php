<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\GlassStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Glass;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;
use \Spatie\Tags\Tag;
use Illuminate\Support\Facades\DB;

class GlassController extends BaseDigModuleController
{
    public function __construct(Glass $model)
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
    
    public function store(GlassStoreRequest $glassRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $glassRequest->validated();

        if ($glassRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current glass+find
            $item = Glass::findOrFail($glassRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Glass', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Glass;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        DB::transaction(function () use ($glassRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($glassRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                DB::table('finds')->where('findable_type', 'Glass')->where('findable_id' , $item->id)->insert($find->toArray());
            } else {
                DB::table('finds')->where('findable_type', 'Glass')->where('findable_id' , $item->id)->update($find->toArray());
            }
        });

        if ($glassRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $item->dot = $locus->areaSeason->dot . '.' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->basket_no . '.' . $find->artifact_no;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "glass and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        DB::transaction(function () use ($id) {
            $glass = Glass::findOrFail($id);
            $find = Find::where(['findable_type' => 'Glass', 'findable_id' => $glass->id]);
            $glass->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "glass and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
