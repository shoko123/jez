<?php

namespace App\Http\Controllers;

use App\Models\Dig\Find;
use App\Models\Dig\Pottery;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PotteryController extends Controller
{
    protected $model;

    public function __construct(Pottery $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {

        $potteryCollection = $this->model->filter($request->all())
            ->get(['pottery.id', 'pottery.periods', 'pottery.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag']);

        $collectionMedia = [];
        foreach ($potteryCollection as $index => $pottery) {
            $pottery->tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $pottery->tag,
                "locusNo" => $pottery->locus_no,
                "registrationCategory" => $pottery->registration_category,
                "basketNo" => $pottery->basket_no,
                "itemNo" => $pottery->item_no,
            ]);

            unset($pottery->notes);
            unset($pottery->locus_no);
            unset($pottery->registration_category);
            unset($pottery->basket_no);
            unset($pottery->item_no);

            //get related media
            $collectionMedia[$index] = $this->model->primaryMedia('Pottery', $pottery);
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
                'find.locus.areaSeason',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media',
            ])
            ->findOrFail($id);

        //add tag to
        $find = $pottery->find;
        $locus = $find->locus;

        //format tag
        $pottery->tag = $this->model->registrationTag((object) [
            "areaSeasonTag" => $locus->areaSeason->tag,
            "locusNo" => $locus->locus_no,
            "registrationCategory" => $find->registration_category,
            "basketNo" => $find->basket_no,
            "itemNo" => $find->item_no,
        ]);

        $area_season_id = $find->locus->areaSeason->id;
        $find->locus_id = $locus->id;
        $find->area_season_id = $area_season_id;
        $pottery->area_season_id = $area_season_id;
        $pottery->locus_id = $locus->id;

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Pottery', $pottery);

        //get tags
        $tags = [];
        foreach ($pottery->tags as $tag) {
            array_push($tags, ['id' => $tag->pivot->tag_id, 'name' => $tag->name, 'type' => $tag->type]);
        }

        unset($pottery->find);
        unset($pottery->media);
        unset($pottery->tags);
        unset($find->locus);

        return response()->json([
            "item" => $pottery,
            "find" => $find,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
        ], 200);
    }

    public function summary()
    {
        $itemCount = Pottery::count();

        $imageCount = Media::where('model_type', 'Pottery')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
