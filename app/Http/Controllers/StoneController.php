<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoneRequest;
use App\Models\Finds\Find;
use App\Models\Finds\Stone;
use App\Models\Locus;
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
        $stones = $this->model->filter($request->all())
            ->get(['stones.id', 'stones.description', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', 'finds.basket_no', 'finds.item_no', 'finds.basket_no', 'finds.item_no', 'areas_seasons.tag']);
      
        $collectionMedia = [];

        //format tags
        foreach ($stones as $index => $stone) {
            $stone->tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $stone->tag,
                "locusNo" => $stone->locus_no,
                "registrationCategory" => $stone->registration_category,
                "basketNo" => $stone->basket_no,
                "itemNo" => $stone->item_no,
            ]);

            //get related media
            $collectionMedia[$index] = $this->model->primaryMedia('Stone', $stone);

            unset($stone->locus_no);
            unset($stone->registration_category);
            unset($stone->reg);
            unset($stone->media);
        }

        return response()->json([
            "collection" => $stones,
            "collectionMedia" => $collectionMedia,
        ], 200);

    }

/**
 * Display the specified resource.
 *
 * @param  \App\Models\Finds\Stone  $Stone
 * @return \Illuminate\Http\Response
 */
    public function show($id)
    {

        $stone = Stone::with(
            ['find',
                'find.locus' => function ($query) {
                    $query->select('id', 'locus_no', 'description', 'area_season_id');},
                'find.locus.areaSeason',
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media',
            ])
            ->findOrFail($id);

        $find = $stone->find;
        $locus = $find->locus;

        //format tag
        $stone->tag = $this->model->registrationTag((object) [
            "areaSeasonTag" => $locus->areaSeason->tag,
            "locusNo" => $locus->locus_no,
            "registrationCategory" => $find->registration_category,
            "basketNo" => $find->basket_no,
            "itemNo" => $find->item_no,
        ]);

        $area_season_id = $find->locus->areaSeason->id;
        $find->locus_id = $locus->id;
        $find->area_season_id = $area_season_id;
        $stone->locus_id = $locus->id;
        $stone->area_season_id = $area_season_id;

        $tags = [];

        foreach ($stone->tags as $tag) {
            array_push($tags, ['id' => $tag->pivot->tag_id, 'name' => substr(substr(json_encode($tag->name), 1), 0, -1), 'type' => $tag->type]);
        }

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Stone', $stone);

        unset($stone->tags);
        unset($stone->media);
        unset($stone->find);
        unset($find->locus);

        return response()->json([
            "item" => $stone,
            "find" => $find,
            "tags" => $tags,
            "itemMedia" => $itemMedia,
            //"fillerMedia" => $fillerMedia
        ], 200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //public function store(FindStoneRequest $request)
    public function store(StoneRequest $request)
    {
        $validated = $request->validated();
        
        $stone = $find = null;
        if ($request->isMethod('put')) {
            $stone = Stone::findOrFail($validated["id"]);
            $find = Find::where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->first();
            unset($stone->find);
        } else {
            $stone = new Stone;
            $find = new Find;
            $find->findable_type = "Stone";
        }

        $stone->description = $validated["description"];
        $stone->notes = $validated["notes"];
        $stone->weight = $validated["weight"];
        $stone->length = $validated["length"];
        $stone->width = $validated["width"];
        $stone->depth = $validated["depth"];
        $stone->thickness_min = $validated["thickness_min"];
        $stone->thickness_max = $validated["thickness_max"];
        $stone->perforation_diameter_min = $validated["perforation_diameter_min"];
        $stone->perforation_diameter_max = $validated["perforation_diameter_max"];
        $stone->perforation_depth = $validated["perforation_depth"];
        $stone->diameter = $validated["diameter"];
        $stone->rim_diameter = $validated["rim_diameter"];
        $stone->rim_thickness = $validated["rim_thickness"];
        $stone->base_diameter = $validated["base_diameter"];
        $stone->base_thickness = $validated["base_thickness"];

        $find->locus_id = $validated["locus_id"];
        $find->registration_category = $validated["registration_category"];
        $find->basket_no = $validated["basket_no"];
        $find->item_no = $validated["item_no"];
        $find->date = $validated["date"];
        $find->related_pottery_basket = $validated["related_pottery_basket"];
        $find->square = $validated["square"];
        $find->level_top = $validated["level_top"];
        $find->level_bottom = $validated["level_bottom"];
        $find->keep = $validated["keep"];
        $find->description = $validated["find_description"];
        $find->notes = $validated["find_notes"];

        \DB::transaction(function () use ($request, $stone, $find) {
            $stone->save();

            //since 'find' has a composite primary key, we need to manually find record and insert/update.
            if ($request->isMethod('post')) {
                $find->findable_id = $stone->id;
                \DB::table('finds')->where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->insert($find->toArray());
            } else {
                \DB::table('finds')->where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->update($find->toArray());
            }

        });

        $newTagsPerType = json_decode(json_encode($request->input('tagsByType')));

        foreach ($newTagsPerType as $key => $x) {
            $stone->syncTagsWithType(array_map(function ($y) {
                return $y->name;
            }, $x->tags), $x->type);
        }

        if ($request->isMethod('post')) {
            //if new stone, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
            $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->item_no : $find->item_no;

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
     * @param  \App\Models\Finds\Stone  $Stone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //TODO add transaction
        $stone = Stone::findOrFail($id);
        \DB::table('finds')->where(['findable_type' => 'Stone', 'findable_id' => $stone->id])->delete();

        $find = 4;
        //Find::destroy($find->id);

        if (!$stone->delete()) {
            return response()->json([
                "msg" => "Failed to delete stone",
            ], 200);
        }
        return response()->json([
            "msg" => "both find + stone entries deleted",
            "item" => $stone,
            "find" => $find,
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
