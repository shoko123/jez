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

        //'post' - similar to other dig item controllers)
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
            'loci' => function ($query) {
                $query->select('id', 'description');},
        ])
            ->findOrFail($id);

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('AreasSeason', $item);
        $loci = $item->loci;
        unset($item->media);
        unset($item->tags);
        unset($item->loci);

        return response()->json([
            "item" => $item,
            "itemMedia" => $itemMedia,
            "loci" => $loci,
            "tagIds" => [],
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

    public function summary()
    {
        $itemCount = AreaSeason::count();

        $imageCount = Media::where('model_type', 'AreaSeason')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
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
            'description' => 'max:2000|nullable',
            'staff' => 'max:500|nullable',
        ]);

        $item = AreaSeason::findOrFail($request["id"]);
        $item["description"] = $validatedRequest["description"];
        $item["staff"] = $validatedRequest["staff"];

        $item->save();

        return response()->json([
            "msg" => "AreaSeason updated succefully",
            "item" => $item,
        ], 200);
    }
}
