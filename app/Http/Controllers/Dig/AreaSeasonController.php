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

        //'post' is similar to other dig item controllers.
        //-----------------------------------------------
        //$this->authorize('viewAny', $this->dig_module);

        $builder = $this->model->with('media');

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
                            $mediaQuery->whereIn('collection_name', $ids);});
                        break;

                    default:
                        //throw Error
                }
            }
        }

        //order
        $collection = $builder->orderBy('id', 'asc')->get();

        $collection = $this->model->formatCollection($collection);

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function show($id)
    {
        $item = $this->model->with([
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
