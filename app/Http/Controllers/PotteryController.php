<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Pottery;
use App\Models\Image\Scene;

use Illuminate\Http\Request;

class PotteryController extends Controller
{
    public function index(Request $request)
    {
        $potteryCollection = \DB::table('finds')
            ->join('pottery', 'finds.findable_id', '=', 'pottery.id')
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.item_no')
            ->where('finds.findable_type', '=', 'Pottery')
            ->select('pottery.id', 'pottery.periods', 'pottery.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag')
            ->get();

        foreach ($potteryCollection as $pottery) {
            $tag = $pottery->tag . '/' . $pottery->locus_no . '.' . $pottery->registration_category . '.';
            $tag .= ($pottery->registration_category == "PT") ? $pottery->basket_no : $pottery->item_no;
            $pottery->{"tag"} = $tag;
        }

        return response()->json([
            "collection" => $potteryCollection], 200);
    }

    public function show($id)
    {
        $pottery = Pottery::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'area_season_id');},
                'find.locus.areaSeason', 'scenes', 'scenes.sceneables',
                'scenes.images',
            ])
            ->findOrFail($id);

        //add tag to
        $find = $pottery->find;
        $locus = $find->locus;

        $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
        $tag .= ($find->registration_category == "PT") ? $find->basket_no : $find->item_no;
        $pottery->{"tag"} = $tag;

 
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 2, "0", STR_PAD_LEFT);

        $area_season_id = $find->locus->areaSeason->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"area_season_id"} = $area_season_id;
        $pottery->{"find_id"} = $find->id;
        $pottery->{"area_season_id"} = $area_season_id;
        $pottery->{"locus_id"} = $locus->id;

        $scenes = $pottery->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
        }

        //$media->{"scenes"}  = $scenes;

        unset($pottery->find);
        unset($pottery->scenes);
        unset($find->locus);
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
        ];
        return response()->json([
            "item" => $pottery,
            "find" => $find,
            "media" => $media,
        ], 200);
    }

    public function summary()
    {
        $itemCount = Pottery::count();

        $imageCount = Scene::withCount(['images', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Pottery');}])->get()->reduce(function ($carry, $item) {         
                $carry += ($item->sceneables_count > 0) ? $item->images_count : 0;
                return $carry;
            });

            $summary = (object)['itemCount' => $itemCount, 'imageCount' => $imageCount];
                
            return response()->json([
                "summary" => $summary],
                200);
    }
}
