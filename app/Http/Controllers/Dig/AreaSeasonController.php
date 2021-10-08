<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Models\Dig\AreaSeason;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AreaSeasonController extends BaseDigModuleController
{
    public function __construct(AreaSeason $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        //'get' is used to get list of {id, tag}, used for creation/update of new elements.
        //-----------------------------------------
        if ($request->isMethod('get')) {
            $as = $this->model->orderBy('id')->get(['id', 'tag']);
            return response()->json([
                "collection" => $as,
            ], 200);
        }

        //'post' is similar to other dig model controllers.
        //-----------------------------------------------
        //$this->authorize('viewAny', $this->dig_module);

        $collection = $this->model->indexForAreasSeasons($request->all());

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
        $as = $this->model->show($id);
        return response($as, 200);
    }

    public function store(Request $request)
    {
        if (!$request->isMethod('put') /*||  !$this->authorize('update', $this->dig_module)*/) {
            return response()->json([
                "msg" => "Unauthorized request on AreaSeason",
            ], 403);
        }

        //basic validation
        $validatedRequest = $request->validate([
            'id' => 'numeric|min:1',
            'summary' => 'max:1000|nullable',
            'description' => 'max:2000|nullable',
        ]);

        $item = $this->model->findOrFail($validatedRequest["id"]);

        foreach ($validatedRequest as $key => $value) {
            $item[$key] = $value;
        }

        $item->save();

        return response()->json([
            "msg" => "AreaSeason updated succefully",
            "item" => $item,
        ], 200);
    }

    //used by create(loci/finds) to exclude existing loci/finds [not a part of CRUD]
    public function loci($area_season_id)
    {
        $areaSason = $this->model->whereId($area_season_id)->first();
        $loci = $areaSason->loci()->get(['id', 'locus_no']);

        foreach ($loci as $locus) {
            $locus["tag"] = $areaSason->tag . '/' . $locus->locus_no;
        }

        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }
}
