<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\Area;
use Illuminate\Http\Request;

class AreaController extends BaseDigModuleController
{
    public function __construct(Area $area)
    {
        $this->model = $area;
    }

    public function index(Request $request)
    {
        $collection = $this->model->with('media')->orderBy('id', 'asc')->get();
        $collection = $this->model->formatCollection($collection);

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function show($id)
    {
        $item = $this->model->with(['media', 'areas_seasons'])->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Area', $item);

        //format related areasSeasons
        $areasSeasons = [];

        foreach ($item->areas_seasons as $index => $as) {

            $media = $this->model->primaryMedia("AreaSeason", $as);

            array_push($areasSeasons, [
                "id" => $as->id,
                "description" => $as->description,
                "tag" => $as->tag,
                "fullUrl" => $media->fullUrl,
                "hasMedia" => $media->hasMedia,
                "tnUrl" => $media->tnUrl,
            ]);
        }

        unset($item->media);
        unset($item->areas_seasons);
        $item->tag = $item->name;

        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
            "areasSeasons" => $areasSeasons,
        ], 200);
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

        $item = $this->model->findOrFail($validatedRequest["id"]);

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
