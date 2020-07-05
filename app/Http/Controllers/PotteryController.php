<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use App\Models\Finds\Pottery;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
            ->with('media')
            ->get(array('pottery.id', 'pottery.periods', 'pottery.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag'));

        $collectionMedia = [];
        foreach ($potteryCollection as $index => $pottery) {
            $tag = $pottery->tag . '/' . $pottery->locus_no . '.' . $pottery->registration_category . '.';
            $tag .= ($pottery->registration_category == "PT") ? $pottery->basket_no : $pottery->item_no;
            $pottery->{"tag"} = $tag;

            unset($pottery->notes);
            unset($pottery->locus_no);
            unset($pottery->registration_category);
            unset($pottery->basket_no);
            unset($pottery->item_no);

            $firstMedia = $pottery->getFirstMedia('photo');

            if (empty($firstMedia)) {
                $collectionMedia[$index] = (object) ["status" => "no_media"];
            } else {
                $fullUrl = $firstMedia->getFullUrl();
                $tnUrl = $firstMedia->getFullUrl('tn');
                $collectionMedia[$index] = (object) [
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                    'status' => 'ready'];
            }
            unset($pottery->media);
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
                'find.locus.areaSeason', 'media',
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

        //related media
        $itemMedia = [];
       
        $allMedia = $pottery->getMedia('photo');
        foreach ($allMedia as $mediaItem) {
            $fullUrl = $mediaItem->getFullUrl();
            $tnUrl = $mediaItem->getFullUrl('tn');
            array_push($itemMedia, ['fullUrl' => $fullUrl, 'tnUrl' => $tnUrl, 'status' => 'ready', 'media_id' => $mediaItem->id]);
        }

        unset($pottery->find);
        unset($pottery->media);
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

        $imageCount = Media::where('model_type','Pottery')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
