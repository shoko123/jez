<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\GlassStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Glass;
use App\Models\Dig\Locus;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \Spatie\Tags\Tag;

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
                'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        foreach ($collection as $index => $item) {
            $item->tag = $this->model->tag($item);

            $media = $this->model->primaryMedia('Glass', $item);
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
            ->get(['glass.id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

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

        $items = Glass::whereIn('id', $itemIds)
            ->orderByRaw(\DB::raw("FIELD(id, $ids)"))
            ->get();

        foreach ($items as $index => $item) {
            $media = $this->model->primaryMedia('Glass', $item);
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

        $items = Glass::whereIn('id', $itemIds)
            ->orderByRaw(\DB::raw("FIELD(id, $ids)"))
            ->get();

        return response()->json([
            "collection" => $items,
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
                'find.specialists',
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
        $itemMedia = $this->model->itemMediaCollection('Glass', $item);

        //get tags
        $tags = [];
        foreach ($item->tags as $tag) {
            array_push($tags, (object) [
                'type' => $tag->type,
                'id' => $tag->pivot->tag_id,
            ]);
        }
        //get tags
        $specialists = [];
        foreach ($find->specialists as $s) {
            array_push($specialists, $s->name);
        }
        $item->specialists = $specialists;
        //$specialists = $find->specialists;

        //cleanup
        unset($item->find);
        unset($item->media);
        unset($item->tags);
        unset($find->locus);
        unset($find->specialists);

        return response()->json([
            "item" => $item,
            "find" => $find,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
            //"specialists" => $specialists,
        ], 200);
    }

    public function store(GlassStoreRequest $glassRequest, FindStoreRequest $findRequest)
    {
        $validated = $item = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedItem = $glassRequest->validated();

        if ($glassRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current glass+find
            $item = Glass::findOrFail($glassRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Glass', 'findable_id' => $item->id])->first();
            unset($item->find);
        } else {
            $this->authorize('create', $this->model);
            $item = new Glass;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedItem["item"] as $key => $value) {
            $item[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        \DB::transaction(function () use ($glassRequest, $item, $find) {
            $item->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($glassRequest->isMethod('post')) {
                $find->findable_id = $item->id;
                \DB::table('finds')->where(['findable_type' => 'Glass', 'findable_id' => $item->id])->insert($find->toArray());
            } else {
                \DB::table('finds')->where(['findable_type' => 'Glass', 'findable_id' => $item->id])->update($find->toArray());
            }
        });

        if ($glassRequest->isMethod('post')) {
            //if new item, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.' . $find->artifact_no;
            $item->tag = $tag;
            $item->locus_id = $find->locus_id;
        }

        return response()->json([
            "msg" => "glass and find created succefully",
            "item" => $item,
            "find" => $find,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        \DB::transaction(function () use ($id) {
            $glass = Glass::findOrFail($id);
            $find = Find::where(['findable_type' => 'Glass', 'findable_id' => $glass->id]);
            $glass->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "glass and related find deleted successfully",
            "id" => $id,
        ], 200);
    }
}
