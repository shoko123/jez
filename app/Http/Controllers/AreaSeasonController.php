<?php

namespace App\Http\Controllers;

use App\Models\Dig\AreaSeason;
use Illuminate\Http\Request;

class AreaSeasonController extends Controller
{
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
        $builder->orderBy('id', 'asc')
            ->orderBy('loci.locus_no', 'asc');

        $collection = $builder->get();
       
        foreach ($collection as $index => $item) {
            $media = $this->model->primaryMedia('AreaSeason', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return response()->json([
            "collection" => $loci,
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
}
