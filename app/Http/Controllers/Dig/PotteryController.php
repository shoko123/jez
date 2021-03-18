<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
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
            ->get(['pottery.id', 'pottery.periods', 'pottery.description', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        foreach ($potteryCollection as $index => $item) {
            $item->tag = $this->model->tag($item);

            $media = $this->model->primaryMedia('Pottery', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;

            unset($item->notes);
            unset($item->locus_no);
            unset($item->registration_category);
            unset($item->basket_no);
            unset($item->artifact_no);
            unset($item->media);
        }

        return response()->json([
            "collection" => $potteryCollection,
        ], 200);
    }
    public function all(Request $request)
    {
        $potteryCollection = $this->model->filter($request->all())
            ->get(['pottery.id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        foreach ($potteryCollection as $index => $item) {
            $item->tag = $this->model->tag($item);
            unset($item->locus_no);
            unset($item->registration_category);
            unset($item->basket_no);
            unset($item->artifact_no);
            unset($item->piece_no);
            unset($item->media);
        }

        return response()->json([
            "collection" => $potteryCollection,
        ], 200);
    }

    public function media(Request $request)
    {
        //$itemIds = array(351, 2239, 352, 353, 559, 560, 534, 535, 359,360,361,362,363,364,365,366,367, 368);
        $itemIds = $request["all"];
        $ids = implode(',', $itemIds);

        $items = Pottery::whereIn('id', $itemIds)
            ->orderByRaw(\DB::raw("FIELD(id, $ids)"))
            ->get();

        foreach ($items as $index => $item) {
            $media = $this->model->primaryMedia('Pottery', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return response()->json([
            "collection" => $items,
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
                'media',
            ])
            ->findOrFail($id);

        //format tag
        $find = $item->find;
        $item->tag = $this->model->tag($find);

        //add fields
        $item->locus_id = $find->locus->id;
        $item->area_season_id = $find->locus->areaSeason->id;
        $item->locus_id = $find->locus->id;

        $find->locus_id = $find->locus->id;
        $find->area_season_id = $find->locus->areaSeason->id;

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Pottery', $item);

        //get tags
        $tags = [];
        foreach ($item->tags as $tag) {
            array_push($tags, (object) [
                'type' => $tag->type,
                'id' => $tag->pivot->tag_id,
            ]);
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
            "id" => $id,
        ], 200);
    }
}
