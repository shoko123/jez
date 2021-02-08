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
            $item["tag"] = $item->season + 2000;
            unset($item->media);
        }

        return response()->json([
            "collection" => $collection,
        ], 200);

    }

    public function show($id)
    {
        $item = Season::with(['media', 'areas_seasons'])->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Season', $item);

        unset($item->media);
        $item->tag = $item->season + 2000;

        //format related areas
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
        unset($item->areas_seasons);

        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
            "areasSeasons" => $areasSeasons
        ], 200);
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
            'season' => 'integer|between:12,18|required',
            'description' => 'max:2000|nullable',
            'staff' => 'max:2000|nullable',
        ]);

        $item = Season::findOrFail($validatedRequest["id"]);
        
        foreach ($validatedRequest as $key => $value) {
            $item[$key] = $value;
        }

        //$item["notes"] = $validatedRequest["dig_notes"];
        //$item["description"] = $validatedRequest["description"];

        $item->save();
        $item->tag = $item->season + 2000;
        
        return response()->json([
            "msg" => "Area updated succefully",
            "item" => $item,
        ], 200);
    }
}
