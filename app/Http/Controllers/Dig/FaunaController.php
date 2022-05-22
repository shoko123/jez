<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\FaunaStoreRequest;
use App\Models\Find;
use App\Models\Dig\Fauna;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class FaunaController extends BaseDigModuleController
{
    public function __construct(Fauna $model)
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

    public function store(FaunaStoreRequest $FaunaRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $FaunaRequest->validated();

        if ($FaunaRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current Fauna+find
            $item = Fauna::findOrFail($FaunaRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Fauna', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Fauna;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        
        DB::transaction(function () use ($FaunaRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($FaunaRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                DB::table('finds')->where('findable_type', 'Fauna')->where('findable_id' , $item->id)->insert($find->toArray());
            } else {
                DB::table('finds')->where('findable_type', 'Fauna')->where('findable_id' , $item->id)->update($find->toArray());
            }
        });
        

        if ($FaunaRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $item->dot = $locus->areaSeason->dot . '.' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->basket_no . '.' . $find->artifact_no;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "Fauna and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        DB::transaction(function () use ($id) {
            $Fauna = Fauna::findOrFail($id);
            $find = Find::where(['findable_type' => 'Fauna', 'findable_id' => $Fauna->id]);
            $Fauna->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "Fauna and related find deleted successfully",
            "id" => $id,
        ], 200);
    }

}
