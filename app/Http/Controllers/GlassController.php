<?php

namespace App\Http\Controllers;

use App\Models\Dig\Find;
use App\Models\Dig\Glass;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class GlassController extends Controller
{
    protected $model;

    public function __construct(Glass $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $collection = $this->model->filter($request->all())
            ->get(['glass.id', 'glass.description',
                'loci.id AS locus_id', 'loci.locus_no',
                'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag']);

        $collectionMedia = [];
        foreach ($collection as $index => $item) {
            $item->tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $item->tag,
                "locusNo" => $item->locus_no,
                "registrationCategory" => $item->registration_category,
                "basketNo" => $item->basket_no,
                "itemNo" => $item->item_no,
            ]);

            unset($item->notes);
            unset($item->locus_no);
            unset($item->registration_category);
            unset($item->basket_no);
            unset($item->item_no);

            //get related media
            $collectionMedia[$index] = $this->model->primaryMedia('Glass', $item);
            unset($item->media);
        }

        return response()->json([
            "collection" => $collection,
            "collectionMedia" => $collectionMedia,
        ], 200);
    }

    public function show($id)
    {
        $item = Glass::with(
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
        $find = $item->find;
        $locus = $find->locus;

        //format tag
        $item->tag = $this->model->registrationTag((object) [
            "areaSeasonTag" => $locus->areaSeason->tag,
            "locusNo" => $locus->locus_no,
            "registrationCategory" => $find->registration_category,
            "basketNo" => $find->basket_no,
            "itemNo" => $find->item_no,
        ]);

        $area_season_id = $find->locus->areaSeason->id;
        $find->locus_id = $locus->id;
        $find->area_season_id = $area_season_id;
        $item->area_season_id = $area_season_id;
        $item->locus_id = $locus->id;

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Glass', $item);

        //get tags
        $tags = $tagIds = [];
        foreach ($item->tags as $tag) {
            array_push($tags, ['id' => $tag->pivot->tag_id, 'name' => $tag->name, 'type' => $tag->type]);
            array_push($tagIds, $tag->pivot->tag_id);
        }

        unset($item->find);
        unset($item->media);
        unset($item->tags);
        unset($find->locus);

        return response()->json([
            "item" => $item,
            "find" => $find,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
            "tagIds" => $tagIds,
        ], 200);
    }

    public function summary()
    {
        $itemCount = Glass::count();

        $imageCount = Media::where('model_type', 'Glass')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
