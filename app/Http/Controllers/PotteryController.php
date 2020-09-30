<?php

namespace App\Http\Controllers;

use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\PotteryStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Locus;
use App\Models\Dig\Pottery;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \Spatie\Tags\Tag;

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
            ->get(['pottery.id', 'pottery.periods', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        $collectionMedia = [];
        foreach ($potteryCollection as $index => $pottery) {
            $pottery->tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $pottery->tag,
                "locusNo" => $pottery->locus_no,
                "registrationCategory" => $pottery->registration_category,
                "basket_no" => $pottery->basket_no,
                "artifact_no" => $pottery->artifact_no,
                "piece_no" => $pottery->piece_no,                
            ]);

            unset($pottery->notes);
            unset($pottery->locus_no);
            unset($pottery->registration_category);
            unset($pottery->basket_no);
            unset($pottery->artifact_no);

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
        $item = Pottery::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'area_season_id');},
                'find.locus.areaSeason',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media', 'baseType'
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
            "basket_no" => $find->basket_no,
            "artifact_no" => $find->artifact_no,
            "piece_no" => $find->piece_no,              
        ]);

        $area_season_id = $find->locus->areaSeason->id;
        $find->locus_id = $locus->id;
        $find->area_season_id = $area_season_id;
        $item->area_season_id = $area_season_id;
        $item->locus_id = $locus->id;

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Pottery', $item);

        $item->base_type_name = is_null($item->baseType) ? null : $item->baseType->name;        
        //get tags
        $tagIds = [];
        foreach ($item->tags as $tag) {
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
            "tagIds" => $tagIds,
        ], 200);
    }

    public function store(PotteryStoreRequest $potteryRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $potteryRequest->validated();

        if ($potteryRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current pottery+find
            $item = Pottery::findOrFail($potteryRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Pottery', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Pottery;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        \DB::transaction(function () use ($potteryRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($potteryRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                \DB::table('finds')->where(['findable_type' => 'Pottery', 'findable_id' => $item->id])->insert($find->toArray());
            } else {
                \DB::table('finds')->where(['findable_type' => 'Pottery', 'findable_id' => $item->id])->update($find->toArray());
            }
        });

        if ($potteryRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->artifact_no;
            $item->tag = $tag;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "pottery and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        \DB::transaction(function () use ($id) {
            $pottery = Pottery::findOrFail($id);
            $find = Find::where(['findable_type' => 'Pottery', 'findable_id' => $pottery->id]);
            $pottery->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "pottery and related find deleted successfully",
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
