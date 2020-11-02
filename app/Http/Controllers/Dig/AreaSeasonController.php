<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Models\Dig\AreaSeason;
use Illuminate\Http\Request;

class AreaSeasonController extends Controller
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
            $areas = AreaSeason::orderBy('id')->get(['id', 'tag']);
            return response()->json([
                "collection" => $areas,
            ], 200);
        }

        //'post' is similar to other dig item controllers.
        //-----------------------------------------------
        //$this->authorize('viewAny', $this->model);

        $builder = AreaSeason::with('media');

        //filter by area.
        if (!empty($request["areas"])) {
            $builder->whereIn('area', $request["areas"]);
        }

        //filter by season.
        if (!empty($request["seasons"])) {
            $builder->whereIn('season', $request["seasons"]);
        }

        //order
        $collection = $builder->orderBy('id', 'asc')->get();

        foreach ($collection as $index => $item) {
            $media = $this->model->primaryMedia('AreaSeason', $item);
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
        $item = AreaSeason::with([
            'media',
            'loci',
        ])
            ->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('AreaSeason', $item);

        //format related loci
        $lociWithMedia = [];
        foreach ($item->loci as $index => $locus) {
            $tag = $item->tag . "/" . $locus->locus_no;

            $media = $this->model->primaryMedia("Locus", $locus);

            array_push($lociWithMedia, [
                "id" => $locus->id,
                "description" => $locus->description,
                "tag" => $tag,
                "fullUrl" => $media->fullUrl,
                "hasMedia" => $media->hasMedia,
                "tnUrl" => $media->tnUrl,
            ]);
        }

        $loci = $item->loci;
        unset($item->media);
        unset($item->loci);

        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
            "loci" => $lociWithMedia,
        ], 200);
    }

    public function loci($area_season_id)
    {
        $areaSason = AreaSeason::whereId($area_season_id)->first();
        $loci = $areaSason->loci()->get(['id', 'locus_no']);

        foreach ($loci as $locus) {
            $locus{"tag"} = $areaSason->tag . '/' . $locus->locus_no;
        }

        return response()->json([
            "lociForArea" => $loci,
        ], 200);
    }

    public function store(Request $request)
    {
        if (!$request->isMethod('put') /*||  !$this->authorize('update', $this->model)*/) {
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

        $item = AreaSeason::findOrFail($validatedRequest["id"]);

        foreach ($validatedRequest as $key => $value) {
            $item[$key] = $value;
        }

        $item->save();

        return response()->json([
            "msg" => "AreaSeason updated succefully",
            "item" => $item,
        ], 200);
    }
}
