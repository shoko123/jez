<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\MetalStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Locus;
use App\Models\Dig\Metal;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \Spatie\Tags\Tag;

class MetalController extends Controller
{
    protected $model;

    public function __construct(Metal $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $collection = $this->model->filter($request->all())
            ->get(['metals.id', 'metals.description',
                'loci.id AS locus_id', 'loci.locus_no',
                'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        foreach ($collection as $index => $item) {
            $item->tag = $this->model->tag($item);
            $media = $this->model->primaryMedia('Metal', $item);
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
            "collection" => $collection,
        ], 200);
    }

    public function all(Request $request)
    {
        $collection = $this->model->filter($request->all())
            ->get(['metals.id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        foreach ($collection as $index => $item) {
            $item->tag = $this->model->tag($item);
            unset($item->locus_no);
            unset($item->registration_category);
            unset($item->basket_no);
            unset($item->artifact_no);
            unset($item->piece_no);
            unset($item->media);
        }

        return response()->json([
            "collection" => $collection,
        ], 200);
    }

    public function chunkMedia(Request $request)
    {
        $itemIds = $request["ids"];
        $ids = implode(',', $itemIds);

        $items = Metal::whereIn('id', $itemIds)
            ->orderByRaw(\DB::raw("FIELD(id, $ids)"))
            ->get();

        foreach ($items as $index => $item) {
            $media = $this->model->primaryMedia('Metal', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return response()->json([
            "collection" => $items,
        ], 200);
    }
    public function chunkTable(Request $request)
    {
        $itemIds = $request["ids"];
        $ids = implode(',', $itemIds);

        $items = Metal::whereIn('id', $itemIds)
            ->orderByRaw(\DB::raw("FIELD(id, $ids)"))
            ->get();

        return response()->json([
            "collection" => $items,
        ], 200);
    }

    public function show($id)
    {
        $item = Metal::with(
            [
                'baseType',
                'find',
                'find.preservation',
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
        $itemMedia = $this->model->itemMediaCollection('Metal', $item);

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

    public function lightbox($id)
    {
        $item = Metal::with(['media'])
            ->findOrFail($id);

        $media = $this->model->primaryMedia('Metal', $item);
        $media->description = $item->description;

        return response()->json([
            "item" => $media,
        ], 200);
    }

    public function store(MetalStoreRequest $metalRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $metalRequest->validated();

        if ($metalRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current metal+find
            $item = Metal::findOrFail($metalRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Metal', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Metal;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        \DB::transaction(function () use ($metalRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($metalRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                \DB::table('finds')->where(['findable_type' => 'Metal', 'findable_id' => $item->id])->insert($find->toArray());
            } else {
                \DB::table('finds')->where(['findable_type' => 'Metal', 'findable_id' => $item->id])->update($find->toArray());
            }
        });

        if ($metalRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->artifact_no;
            $item->tag = $tag;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "metal and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        \DB::transaction(function () use ($id) {
            $metal = Metal::findOrFail($id);
            $find = Find::where(['findable_type' => 'Metal', 'findable_id' => $metal->id]);
            $metal->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "metal and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
