<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Pottery;
use Illuminate\Http\Request;

class PotteryController extends Controller
{
    public function index(Request $request)
    {
        $potteryCollection = \DB::table('finds')
            ->join('pottery', 'finds.findable_id', '=', 'pottery.id')
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas', 'loci.area_id', '=', 'areas.id')
            ->orderBy('loci.area_id')
            ->orderBy('loci.locus')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.item_no')
            ->where('finds.findable_type', '=', 'Pottery')
            ->select('pottery.id', 'pottery.periods', 'pottery.notes', 'loci.id AS locus_id', 'loci.locus', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas.year AS year', 'areas.area AS area')
            ->get();

        foreach ($potteryCollection as $pottery) {
            $id_string = $pottery->year - 2000 . '.' . $pottery->area . '.' . str_pad($pottery->locus, 3, "0", STR_PAD_LEFT);
            $id_string .= '.' . $pottery->registration_category . '.';
            $id_string .= ($pottery->registration_category == "PT") ? str_pad($pottery->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($pottery->item_no, 2, "0", STR_PAD_LEFT) : str_pad($pottery->item_no, 2, "0", STR_PAD_LEFT);

            $tag = $pottery->year - 2000 . '/' . $pottery->area . '/' . $pottery->locus . '.' . $pottery->registration_category . '.';
            $tag .= ($pottery->registration_category == "PT") ? $pottery->basket_no : $pottery->item_no;
            $pottery->{"id_string"} = $id_string;
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
                    $query->select('id', 'locus', 'area_id');},
                'find.locus.area', 'scenes', 'scenes.sceneables',
                'scenes.images',
            ])
            ->findOrFail($id);

        //add id_string to locus
        $find = $pottery->find;
        $locus = $find->locus;

        $tag = $locus->area->year - 2000 . '/' . $locus->area->area . '/' . $locus->locus . '.' . $find->registration_category . '.';
        //$tag = $pottery->year - 2000 . '.' . $pottery->area . '.' . $pottery->locus . '.' . $pottery->registration_category . '.';
        $tag .= ($find->registration_category == "PT") ? $find->basket_no : $find->item_no;
        $pottery->{"tag"} = $tag;

        $locus_id_string = $locus->area->year - 2000 . '.' . $locus->area->area . '.' . str_pad($locus->locus, 3, "0", STR_PAD_LEFT);
        $gs_basket_string = ($find->registration_category == "GS") ? str_pad($find->basket_no, 2, "0", STR_PAD_LEFT) . '.' . str_pad($find->item_no, 2, "0", STR_PAD_LEFT) : str_pad($find->item_no, 2, "0", STR_PAD_LEFT);
        $id_string = $locus_id_string . '.' . $find->registration_category . '.';
        $area_id = $find->locus->area->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"locus_id_string"} = $locus_id_string;
        $find->{"area_id"} = $area_id;
        $pottery->{"find_id"} = $find->id;
        $pottery->{"area_id"} = $area_id;
        $pottery->{"locus_id"} = $locus->id;
        $pottery->{"id_string"} = $id_string . $gs_basket_string;

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
}
