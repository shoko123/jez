<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\BaseDigModuleController;
use App\Http\Requests\LocusStoreRequest;
use App\Models\Dig\AreaSeason;
use App\Models\Dig\Find;
use App\Models\Dig\Locus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class LocusController extends BaseDigModuleController
{
    public function __construct(Locus $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', $this->model);
        $collection = $this->model->indexForLocus($request->all());
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

    //called by create new find to avoid duplicate registrations.
    public function finds(Request $request, $id)
    {
        $finds = Find::where('locus_id', $id)
            ->where('findable_type', $request->input('find_type'))
            ->select('findable_type', 'findable_id', 'locus_id', 'registration_category', 'basket_no', 'artifact_no', 'piece_no')
            ->get();

        return response()->json([
            "finds" => $finds,
        ], 200);
    }

    public function show($id)
    {
        $this->authorize('view', $this->model);
        $locus = $this->model->show($id);
        return response($locus, 200);
    }

    public function store(LocusStoreRequest $request)
    {
        $validated = $request->validated();

        if ($request->isMethod('put')) {
            $this->authorize('update', $this->model);
            $locus = $this->model->findOrFail($request->input('id'));
        } else {
            $this->authorize('create', $this->model);
            $locus = new Locus;
        }

        $locus->area_season_id = $validated["area_season_id"];
        $locus->locus_no = $validated["locus_no"];
        $locus->square = $validated["square"];
        $locus->date_opened = $validated["date_opened"];
        $locus->date_closed = $validated["date_closed"];
        $locus->level_opened = $validated["level_opened"];
        $locus->level_closed = $validated["level_closed"];
        $locus->locus_above = $validated["locus_above"];
        $locus->locus_below = $validated["locus_below"];
        $locus->locus_co_existing = $validated["locus_co_existing"];
        $locus->clean = $validated["clean"];
        $locus->description = $validated["description"];
        $locus->deposit = $validated["deposit"];
        $locus->registration_notes = $validated["registration_notes"];

        $locus->save();

        if ($request->isMethod('post')) {
            //if new locus, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            $areaSeason = AreaSeason::findOrFail($locus->area_season_id);
            $locus->tag = $areaSeason->tag . '/' . $locus->locus_no;
            $locus->dot = $areaSeason->dot . '.' . $locus->locus_no;
            unset($locus->square);
            unset($locus->date_opened);
            unset($locus->date_closed);
            unset($locus->level_opened);
            unset($locus->level_closed);
            unset($locus->locus_above);
            unset($locus->locus_below);
            unset($locus->locus_co_existing);
            unset($locus->clean);
            unset($locus->deposit);
            unset($locus->registration_notes);
        }

        return response()->json([
            "item" => $locus,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        $locus = $this->model->findOrFail($id);
        if ($locus->delete()) {

            return response()->json([
                "item" => $locus,
                "id" => $id,
            ], 200);
            //return new LocusResource($locus);
        }
    }
}
