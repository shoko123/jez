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

        $builder = $this->model->leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id');

        if (!empty($request["registration"] && !empty($request["registration.media"]))) {
            $builder->with('media');
        }

        //$this->model->leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
        //->select('areas_seasons.tag as area_season_tag')->with('media');
        //filter by tags

        if (!empty($request["tags"])) {
            $tag_types = (object) [];
            foreach ($request["tags"]["tags"] as $index => $tag_id) {
                $t = ItemTag::select('type', 'name')->findOrFail($tag_id);
                $type = $t->type;
                if (property_exists($tag_types, $type)) {
                    array_push($tag_types->$type, $t->name);
                } else {
                    $tag_types->$type = array($t->name);
                }
            }

            foreach ($tag_types as $key => $value) {
                $builder->withAnyTags($value, $key);
            }
        }

        if (!empty($request["registration"])) {
            foreach ($request["registration"] as $key => $ids) {
                switch ($key) {
                    case "areas":
                        $builder->whereIn("area", $ids);
                        break;

                    case "seasons":
                        $builder->whereIn("season", $ids);
                        break;

                    case "media":
                        $builder->whereHas('media', function (Builder $mediaQuery) use ($ids) {
                            $mediaQuery->whereIn('collection_name', $ids);
                        });
                        break;
                    default:
                        //TODO throw Error
                }
            }
        }

        //order
        $builder->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc');

        //format tag
        $builder->select("loci.id AS id", \DB::raw("CONCAT(areas_seasons.tag,'/',locus_no) as tag"));

        //get results
        $collection = $builder->get();

        if (!empty($request["registration"] && !empty($request["registration.media"]))) {
            foreach ($collection as $index => $item) {
                unset($item->media);
            }
        }
        //$collection = $this->model->formatCollection($loci);

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

    //used by only create new find
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
