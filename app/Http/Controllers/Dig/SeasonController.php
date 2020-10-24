<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Models\Dig\Season;
use Illuminate\Http\Request;

class SeasonController extends Controller
{
    public function __construct(Season $model)
    {
        $this->model = $model;
    }
    public function index(Request $request)
    {
        $collection = Season::with('media')->orderBy('id', 'asc')->get();

        foreach ($collection as $index => $item) {
            $media = $this->model->primaryMedia('Season', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return response()->json([
            "collection" => $collection,
        ], 200);

    }

    public function show($id)
    {
        $item = Season::with(['media'])->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Season', $item);

        unset($item->media);
        $item->tag = $item->season + 2000;

        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
        ], 200);
    }


    public function summary()
    {
        $itemCount = Season::count();

        $imageCount = Media::where('model_type', 'Season')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }

    public function store(Request $request)
    {
        if (!$request->isMethod('put') /*||  !$this->authorize('update', $this->model)*/) {
            return response()->json([
                "msg" => "Unauthorized request on Season",
            ], 403);
        }

        //basic validation
        $validatedRequest = $request->validate([
            'id' => 'numeric|min:1',
            'dig_notes' => 'max:2000|nullable',
        ]);

        $item = Season::findOrFail($request["id"]);
         $item["description"] = $validatedRequest["description"];
        $item["staff"] = $validatedRequest["staff"];
       

        $item->save();

        return response()->json([
            "msg" => "Season updated succefully",
            "item" => $item,
        ], 200);
    }
}
