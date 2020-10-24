<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Models\Dig\Area;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function __construct(Area $model)
    {
        $this->model = $model;
    }
    public function index(Request $request)
    {
        $collection = Area::with('media')->orderBy('id', 'asc')->get();

        foreach ($collection as $index => $item) {
            $media = $this->model->primaryMedia('Area', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            $item["tag"] = $item->name;            
            unset($item->media);
        }

        return response()->json([
            "collection" => $collection,
        ], 200);

    }

    public function show($id)
    {
        $item = Area::with(['media'])->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Area', $item);

        unset($item->media);
        $item->tag = $item->name;
        
        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
        ], 200);
    }


    public function summary()
    {
        $itemCount = Area::count();

        $imageCount = Media::where('model_type', 'Area')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }

    public function store(Request $request)
    {
        if (!$request->isMethod('put') /*||  !$this->authorize('update', $this->model)*/) {
            return response()->json([
                "msg" => "Unauthorized request on Area",
            ], 403);
        }

        //basic validation
        $validatedRequest = $request->validate([
            'id' => 'numeric|min:1',
            'name' => 'max:1|required',
            'description' => 'max:2000|nullable',
            'notes' => 'max:2000|nullable',
        ]);

        $item = Area::findOrFail($validatedRequest["id"]);
        
        foreach ($validatedRequest as $key => $value) {
            $item[$key] = $value;
        }

        //$item["notes"] = $validatedRequest["dig_notes"];
        //$item["description"] = $validatedRequest["description"];

        $item->save();
        $item->tag = $item->name;
        
        return response()->json([
            "msg" => "Area updated succefully",
            "item" => $item,
        ], 200);
    }
}
