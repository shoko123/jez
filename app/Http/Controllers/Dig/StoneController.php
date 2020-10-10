<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Http\Requests\FindStoreRequest;
use App\Http\Requests\StoneStoreRequest;
use App\Models\Dig\Find;
use App\Models\Dig\Locus;
use App\Models\Dig\Stone;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use \Spatie\Tags\Tag;

class StoneController extends Controller
{
    protected $model;

    public function __construct(Stone $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', $this->model);

        $stones = $this->model->filter($request->all())
            ->get(['stones.id', 'stones.description', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'finds.basket_no', 'finds.artifact_no', 'finds.piece_no', 'areas_seasons.tag']);

        //format tags
        foreach ($stones as $index => $item) {
            $item->tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $item->tag,
                "locusNo" => $item->locus_no,
                "registrationCategory" => $item->registration_category,
                "basket_no" => $item->basket_no,
                "artifact_no" => $item->artifact_no,
                "piece_no" => $item->piece_no,
            ]);

            //get related media
            $media = $this->model->primaryMedia('Stone', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->locus_no);
            unset($item->registration_category);
            unset($item->reg);
            unset($item->media);
        }

        return response()->json([
            "collection" => $stones,
        ], 200);

    }

/**
 * Display the specified resource.
 *
 * @param  \App\Models\Dig\Stone  $Stone
 * @return \Illuminate\Http\Response
 */
    public function show($id)
    {
        $this->authorize('view', $this->model);

        $stone = Stone::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'description', 'area_season_id');},
                'find.locus.areaSeason',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media', 'baseType', 'material', 'preservation',
            ])
            ->findOrFail($id);

        $find = $stone->find;
        $locus = $find->locus;

        //format tag
        $stone->tag = $this->model->registrationTag((object) [
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
        $stone->locus_id = $locus->id;
        $stone->area_season_id = $area_season_id;

        $stone->base_type_name = is_null($stone->baseType) ? null : $stone->baseType->name;
        $stone->material_name = is_null($stone->material) ? null : $stone->material->name;
        $stone->preservation_name = is_null($stone->preservation) ? null : $stone->preservation->name;

        $tagIds = [];

        foreach ($stone->tags as $tag) {
            array_push($tagIds, $tag->pivot->tag_id);
        }

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Stone', $stone);

        //cleanup
        unset($stone->tags);
        unset($stone->media);
        unset($stone->find);
        unset($find->locus);
        unset($stone->baseType);
        unset($stone->preservation);
        unset($stone->material);

        return response()->json([
            "item" => $stone,
            "find" => $find,
            "tagIds" => $tagIds,
            "itemMedia" => $itemMedia,
        ], 200);
    }

    public function store(StoneStoreRequest $stoneRequest, FindStoreRequest $findRequest)
    {
        $validated = $stone = $find = null;
        $validatedFind = $findRequest->validated();
        $validatedStone = $stoneRequest->validated();

        if ($stoneRequest->isMethod('put')) {
            //authorize & validate
            $this->authorize('update', $this->model);

            //load current stone+find
            $stone = Stone::findOrFail($stoneRequest["item.id"]);
            $find = Find::where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->first();
            unset($stone->find);
        } else {
            $this->authorize('create', $this->model);
            $stone = new Stone;
            $find = new Find;
        }
        //copy the validated data from the validated array to the 'item' and 'find' objects.
        foreach ($validatedStone["item"] as $key => $value) {
            $stone[$key] = $value;
        }
        foreach ($validatedFind["find"] as $key => $value) {
            $find[$key] = $value;
        }

        \DB::transaction(function () use ($stoneRequest, $stone, $find) {
            $stone->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($stoneRequest->isMethod('post')) {
                $find->findable_id = $stone->id;
                \DB::table('finds')->where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->insert($find->toArray());
            } else {
                \DB::table('finds')->where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->update($find->toArray());
            }
        });

        if ($stoneRequest->isMethod('post')) {
            //if new stone, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
            $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->artifact_no : $find->artifact_no;

            $stone->tag = $tag;
            $stone->locus_id = $find->locus_id;

            unset($stone->weight);
            unset($stone->notes);
        }

        return response()->json([
            "msg" => "stone and find created succefully",
            "item" => $stone,
            "find" => $find,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dig\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

        \DB::transaction(function () use ($id) {
            $stone = Stone::findOrFail($id);
            $find = Find::where(['findable_type' => 'Stone', 'findable_id' => $stone->id]);
            $stone->delete();
            $find->delete();
        });

        return response()->json([
            "msg" => "stone and related find deleted successfully",
        ], 200);
    }

    public function summary()
    {
        $itemCount = Stone::count();
        $imageCount = Media::where('model_type', 'Stone')->count();
        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }

}
