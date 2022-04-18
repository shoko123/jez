<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\Season;
use Illuminate\Http\Request;

class SeasonController extends BaseDigModuleController
{
    public function __construct(Season $season)
    {
        $this->model = $season;
    }

    public function index(Request $request)
    {
        $collection = $this->model->indexForAreasSeasons(null);

        return response()->json([
            "collection" => $collection,
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

        $item = $this->model->findOrFail($validatedRequest["id"]);

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
