<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\MetalStoreRequest;
use App\Models\Find;
use App\Models\Dig\Locus;
use App\Models\Dig\Metal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MetalController extends BaseDigModuleController
{
    public function __construct(Metal $model)
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

    public function store(MetalStoreRequest $metalRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $metalRequest->validated();

        if ($metalRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current metal+find
            $item = Metal::findOrFail($metalRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Metal', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Metal;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        DB::transaction(function () use ($metalRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($metalRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                DB::table('finds')->where('findable_type', 'Metal')->where('findable_id' , $item->id)->insert($find->toArray());
            } else {
                DB::table('finds')->where('findable_type' , 'Metal')->where( 'findable_id' , $item->id)->update($find->toArray());
            }
        });
        
        if ($metalRequest->isMethod('post')) {
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $item->locus_id = $find->locus_id;
            $item->dot = $locus->areaSeason->dot . '.' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->basket_no . '.' . $find->artifact_no;
        }
        return response()->json([
            "msg" => "metal and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        DB::transaction(function () use ($id) {
            $metal = Metal::findOrFail($id);
            $find = Find::where(['findable_type' => 'Metal', 'findable_id' => $metal->id]);
            $metal->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "metal and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
