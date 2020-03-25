<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoneRequest;
use App\Models\Finds\Find;
use App\Models\Finds\Stone;
use App\Models\Locus;
use App\Models\Media\Scene;
use Illuminate\Http\Request;

class StoneController extends Controller
{
    public function index(Request $request)
    {
        $stones = Stone::join('finds', function ($join) {
            $join->on('stones.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', 'Stone');
        })
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('reg')
        //->orderBy('finds.item_no')
            ->with(
                [
                    'scenes',
                    'scenes.sceneables' => function ($q) {
                        $q->select('id', 'scene_id');},
                    'scenes.media' => function ($q) {
                        $q->select('id', 'scene_id', 'media_type', 'extension', 'date_taken');},
                ])
            ->select('stones.id', 'stones.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', \DB::raw('finds.basket_no*100+finds.item_no AS reg'), 'areas_seasons.tag')
            ->get();

        $media = null;
        foreach ($stones as $index => $stone) {
            $tag = $stone->tag . '/' . $stone->locus_no . '.' . $stone->registration_category . '.';
            $tag .= ($stone->registration_category == "GS") ? $stone->basket_no . '.' . $stone->item_no : $stone->item_no;
            $stone->{"tag"} = $tag;

            unset($stone->locus_no);
            unset($stone->registration_category);
            unset($stone->reg);

            if (empty($stone->scenes)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (empty($stone->scenes->first()->media)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (is_null($stone->scenes->first()->media->first())) {
                $media[$index] = (object) ["status" => "no_media"];
            } else {
                $media[$index] = $stone->scenes->first()->media->first();
                $media[$index]->{"status"} = "ready"; //clone $stone->scenes[0]->media[0];
            }
            foreach ($stone->scenes as $scene) {
                $scene->media = null;
            }
            unset($stone->scenes);
        }

        return response()->json([
            "collection" => $stones,
            "media" => $media], 200);

    }

    public function query(Request $request)
    {
        $params = $request->json()->all();

        $queryParams = $params["queryParams"];
        $cnt = 0; //$params[1];
        $type = $names = $tags = null;
        foreach ($queryParams as $index => $param) {
            $cnt++;
            $type[$index] = "Stone:" . $param["type"];
            $tags[$index] = $param["tags"];
        }

        if (empty($queryParams)) {
            $names = [];
            $type[0] = "";
        } else {
            foreach ($tags[0] as $index => $tag) {
                $names[$index] = $tag["name"];
                //$tags[$index] = $param["tags"];
            }
        }
        //$names = array_map(function($obj){ return $obj->name; }, $tags[0]);
        $arr = null; // $params->queryParams;

        /*
        $type = [];
        $type[0] = "";
        $names = [];
        $names[0] = [];

        foreach ($request['queryParams'] as $index => $x) {
        $type[$index] = $x->type;
        $names[$index] = $x->tags;
        }
         */
        //$type = $params[0]->type;
        //$names = $params[0]->tags;

        $stones = Stone::join('finds', function ($join) {
            $join->on('stones.id', '=', 'finds.findable_id')
                ->where('finds.findable_type', '=', 'Stone');
        })
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->leftJoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
        //->withAllTags(['Basalt-dense'], 'stone:material')
            ->withAnyTags($names, $type[0])
            ->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->orderBy('finds.registration_category')
            ->orderBy('reg')
        //->orderBy('finds.item_no')
            ->with(
                [
                    'scenes',
                    'scenes.sceneables' => function ($q) {
                        $q->select('id', 'scene_id');},
                    'scenes.media' => function ($q) {
                        $q->select('id', 'scene_id', 'media_type', 'extension', 'date_taken');},
                    'tags',
                ])
            ->select('stones.id', 'stones.notes', 'loci.id AS locus_id', 'loci.locus_no', 'finds.registration_category', \DB::raw('finds.basket_no*100+finds.item_no AS reg'), 'areas_seasons.tag')
            ->get();

        $media = null;
        foreach ($stones as $index => $stone) {
            $tag = $stone->tag . '/' . $stone->locus_no . '.' . $stone->registration_category . '.';
            $tag .= ($stone->registration_category == "GS") ? $stone->basket_no . '.' . $stone->item_no : $stone->item_no;
            $stone->{"tag"} = $tag;

            unset($stone->locus_no);
            unset($stone->registration_category);
            unset($stone->reg);

            if (empty($stone->scenes)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (empty($stone->scenes->first()->media)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (is_null($stone->scenes->first()->media->first())) {
                $media[$index] = (object) ["status" => "no_media"];
            } else {
                $media[$index] = $stone->scenes->first()->media->first();
                $media[$index]->{"status"} = "ready"; //clone $stone->scenes[0]->media[0];
            }
            foreach ($stone->scenes as $scene) {
                $scene->media = null;
            }
            unset($stone->scenes);
        }

        return response()->json([
            "collection" => $stones,
            "media" => $media,
            "params" => $params,
            "arr" => $arr,
            "cnt" => $cnt], 200);

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
                'find.locus.areaSeason', 'scenes', 'scenes.sceneables', 'stone_type', 'material',
                'scenes.media',
            ])
            ->findOrFail($id);

        //add tag to locus
        $find = $stone->find;
        $locus = $find->locus;

        $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
        $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->item_no : $find->item_no;
        $stone->{"tag"} = $tag;

        $area_season_id = $find->locus->areaSeason->id;
        $find->{"locus_id"} = $locus->id;

        $find->{"area_season_id"} = $area_season_id;
        $stone->{"locus_id"} = $locus->id;
        $stone->{"area_season_id"} = $area_season_id;

        $scenes = $stone->scenes;
        foreach ($scenes as $scene) {
            unset($scene->pivot);
        }

        //$media->{"scenes"}  = $scenes;

        unset($stone->find);
        unset($stone->scenes);
        unset($stone->material_id);
        unset($stone->stone_type_id);

        unset($find->locus);
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
        ];
        return response()->json([
            "item" => $stone,
            "find" => $find,
            "media" => $media,
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

        //return response()->json([
        //    "validated"=> $validated,
        //], 200);
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

        $stone->stone_type_id = $validated["stone_type_id"];
        $stone->material_id = $validated["material_id"];
        $stone->notes = $validated["stone_notes"];
        $stone->measurements = $validated["measurements"];
        $stone->weight = $validated["weight"];

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

        if ($request->isMethod('post')) {
            //if new stone, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            //$locus = Locus::findOrFail($find->locus_id);
            $locus = Locus::with('areaSeason')->findOrFail($find->locus_id);
            $tag = $locus->areaSeason->tag . '/' . $locus->locus_no . '.' . $find->registration_category . '.';
            $tag .= ($find->registration_category == "GS") ? $find->basket_no . '.' . $find->item_no : $find->item_no;

            $stone->{"tag"} = $tag;
            $stone->{"locus_id"} = $find->locus_id;

            unset($stone->stone_type_id);
            unset($stone->material_id);
            unset($stone->weight);
            unset($stone->measurements);
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

        $imageCount = Scene::withCount(['media', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Stone');}])->get()->reduce(function ($carry, $item) {
            $carry += ($item->sceneables_count > 0) ? $item->media_count : 0;
            return $carry;
        });

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }

}
