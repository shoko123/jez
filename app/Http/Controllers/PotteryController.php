<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Pottery;
use App\Models\Scene\Scene;
use Illuminate\Http\Request;

class PotteryController extends Controller
{
    public function query(Request $request)
    {
        $potteryCollection = Pottery::join('finds', function ($join) {
            $join->on('pottery.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', 'Pottery');
        })
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('finds.basket_no')
            ->orderBy('finds.item_no')
            ->with(
                [
                    'scenes',
                    'scenes.sceneables' => function ($q) {
                        $q->select('id', 'scene_id');},
                ])
            ->get(array('pottery.id', 'pottery.periods', 'pottery.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag'));

        $media = $collectionMedia = [];
        foreach ($potteryCollection as $index => $pottery) {
            $tag = $pottery->tag . '/' . $pottery->locus_no . '.' . $pottery->registration_category . '.';
            $tag .= ($pottery->registration_category == "PT") ? $pottery->basket_no : $pottery->item_no;
            $pottery->{"tag"} = $tag;

            unset($pottery->notes);
            unset($pottery->locus_no);
            unset($pottery->registration_category);
            unset($pottery->basket_no);
            unset($pottery->item_no);

            //new collectionMedia implementation
            $itemMedia = null;

            foreach ($pottery->scenes as $scene) {
                foreach ($scene->media as $mediaItem) {
                    $itemMedia = (object) ['fullUrl' => $mediaItem->getFullUrl(), 'tnUrl' => $mediaItem->getFullUrl('tn'), 'status' => 'ready'];
                    break 2;
                }
            }

            if (is_null($itemMedia)) {
                $collectionMedia[$index] = (object) ["status" => "no_media"];
            } else {
                $collectionMedia[$index] = $itemMedia;
            }

            unset($pottery->scenes);
        }

        return response()->json([
            "collection" => $potteryCollection,
            "collectionMedia" => $collectionMedia,
        ], 200);
    }

    public function show($id)
    {
        $pottery = Pottery::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'area_season_id');},
                'find.locus.areaSeason', 'scenes', 'scenes.sceneables',
            ])
            ->findOrFail($id);

        //add tag to
        $find = $pottery->find;
        $locus = $find->locus;

        $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
        $tag .= ($find->registration_category == "PT") ? $find->basket_no : $find->item_no;
        $pottery->{"tag"} = $tag;

        $area_season_id = $find->locus->areaSeason->id;
        $find->{"locus_id"} = $locus->id;
        $find->{"area_season_id"} = $area_season_id;
        $pottery->{"area_season_id"} = $area_season_id;
        $pottery->{"locus_id"} = $locus->id;

        $scenes = $pottery->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
        }

        $itemMedia = [];

        foreach ($scenes as $scene) {
            if ($scene->media) {
                unset($scene->pivot);
                foreach ($scene->media as $mediaItem) {
                    array_push($itemMedia, ['fullUrl' => $mediaItem->getFullUrl(), 'tnUrl' => $mediaItem->getFullUrl('tn'), 'media_id' => $mediaItem->id]);
                }
            }
        }
        //$media->{"scenes"}  = $scenes;

        unset($pottery->find);
        unset($pottery->scenes);
        unset($find->locus);

        return response()->json([
            "item" => $pottery,
            "find" => $find,
            "itemMedia" => $itemMedia,
        ], 200);
    }

    public function summary()
    {
        $itemCount = Pottery::count();

        $imageCount = Scene::withCount(['media', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Pottery');}])->get()->reduce(function ($carry, $item) {
            $carry += ($item->sceneables_count > 0) ? $item->media_count : 0;
            return $carry;
        });

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
