<?php

namespace App\Http\Controllers;

use App\Http\Resources\Locus as LocusResource;
//use App\http\Requests;

use App\Models\Area;
use App\Models\Locus;

use App\Models\Finds\Fauna;
use App\Models\Finds\Flora;
use App\Models\Finds\Glass;
use App\Models\Finds\Lithic;
use App\Models\Finds\Metal;
use App\Models\Finds\Pottery;
use App\Models\Finds\Shell;
use App\Models\Finds\Stone;
use App\Models\Finds\PotteryBasket;
use App\Models\Finds\Tbd;





use Illuminate\Http\Request;

class LocusController extends Controller
{
    public function index()
    {
        //since we need to sort by foreign table columns, we must use a joint
        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
            ->orderBy('areas.year', 'asc')
            ->orderBy('areas.area', 'asc')
            ->orderBy('loci.locus', 'asc')
            ->get(array('loci.id', 'loci.locus', 'loci.area_id', 'loci.description', 'areas.year', 'areas.area'));

        //format response, add id_string
        foreach ($loci as $locus) {
            $id_string = $locus->year - 2000 . '.' . $locus->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
            $tag = $locus->year - 2000 . '/' . $locus->area . '/' . $locus->locus;
            $locus->{"id_string"} = $id_string;
            $locus->{"tag"} = $tag;
            unset($locus->locus);
            unset($locus->year);
            unset($locus->area);
        }

        return response()->json([
            "loci" => $loci], 200);
    }

    //used by findNewRgistration
    public function finds($id)
    {
        $locus = Locus::findOrFail($id);
        $finds = $locus->finds()->get(['id', 'registration_category', 'basket_no', 'item_no', 'findable_type']);
        $area_data = $locus->area;
        $locus_id_string = $area_data->year - 2000 . '.' . $area_data->area . '.' . $locus->locus;

        return response()->json([
            "id_string" => $locus_id_string,
            "finds" => $finds,
        ], 200);
    }

    /*
    public function locusFinds($id)
    {
    $locus = Locus::with(
    [
    'area' => function ($q) {
    $q->select('id', 'year', 'area');},
    'finds' => function ($q) {
    $q->select('id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type', 'findable_id');},

    ])->findOrFail($id);

    $id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
    $locus->{"id_string"} = $id_string;

    foreach ($locus->finds as $find) {
    //$id_string = $locus->year - 2000 . '.' . $locus->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
    //$locus->{"id_string"} = $id_string;
    //unset($locus->locus);
    //unset($locus->year);
    //unset($locus->area);
    }

    return response()->json([
    "locus" => $locus,
    ], 200);

    return response()->json([
    "id_string" => $locus_id_string,
    "finds" => $finds,
    ], 200);
    }
     */

    public function show($id)
    {
        $locus = Locus::with(
            ['area' => function ($q) {
                $q->select('id', 'year', 'area');},
                'finds' => function ($q) {
                    $q->select('id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type', 'findable_id', 'description');},
                'scenes', 'scenes.sceneables', 'scenes.images',
            ])->findOrFail($id);

        $id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $locus->{"id_string"} = $id_string;

        ///
        $scenes = $locus->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
            foreach ($scene->images as $image) {
                unset($image->scene_id);
            }
        }

        unset($locus->scenes);

        foreach ($locus->finds as $key => $find) {
            $locus->finds[$key]{"image"} = $this->image($find);
        }

        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
        ];
        ////
        return response()->json([
            "locus" => $locus,
            "media" => $media,
        ], 200);
    }

    protected function image($find)
    {
        $instance = null;
        $class = '\App\Models\Finds\\' . $find->findable_type;
        $instance = new $class;

        //$instance->select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);

        switch ($find->findable_type) {
            case 'Fauna':
                $instance = Fauna::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Flora':
                $instance = Flora::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Glass':
                $instance = Glass::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Lithic':
                $instance = Lithic::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Metal':
                $instance = Metal::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Pottery':
                $instance = Pottery::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'PotteryBasket':
                $instance = PotteryBasket::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Shell':
                $instance = Shell::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Stone':
                $instance = Stone::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Tbd':
                $instance = Tbd::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            default:
                return "Failed to create " . $find->findable_type . " instance.";
        }

        $images = $image = null;

        foreach ($instance->scenes as $scene) {
            if (count($scene->sceneables) == 1) {
                $images = $scene->images;
                break;
            }
        }
        return $images ? $images[0] : null;
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        if ($request->isMethod('put')) {
            $locus = Locus::findOrFail($request->input('id'));
        } else {
            $locus = new Locus;
        }

        //$locus->id = $request->id;
        $locus->area_id = $request->area_id;
        $locus->locus = $request->locus;
        $locus->square = $request->square;
        $locus->date_opened = $request->date_opened;
        $locus->date_closed = $request->date_closed;
        $locus->level_opened = $request->level_opened;
        $locus->level_closed = $request->level_closed;
        $locus->locus_above = $request->locus_above;
        $locus->locus_below = $request->locus_below;
        $locus->locus_co_existing = $request->locus_co_existing;
        $locus->description = $request->description;
        $locus->deposit = $request->deposit;
        $locus->registration_notes = $request->registration_notes;

        //$locus = $request->input('locus');
        $locus->save();

        return response()->json([
            "locus" => $locus,
        ], 200);

    }

    public function edit(Locus $locus)
    {
        //
    }

    public function update(Request $request, Locus $locus)
    {
        //
    }

    public function destroy($id)
    {
        $locus = Locus::findOrFail($id);
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }

    public function lociForArea($area_id)
    {
        $locus = Locus::findOrFail($id);
        //NO NO
        if ($locus->delete()) {
            return new LocusResource($locus);
        }
    }
}
