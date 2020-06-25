<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocusRequest;
use App\Models\AreaSeason;
use App\Models\Finds\Fauna;
use App\Models\Finds\Flora;
use App\Models\Finds\Glass;
use App\Models\Finds\Lithic;
use App\Models\Finds\Metal;
use App\Models\Finds\Pottery;
use App\Models\Finds\Stone;
use App\Models\Finds\Tbd;
use App\Models\Scene\Scene;
use App\Models\Locus;
use Illuminate\Http\Request;

class LocusController extends Controller
{
    public function index()
    {
        //since we need to sort by foreign table columns, we must use a joint
        $loci = Locus::leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc')
            ->with(
                [
                    'scenes',
                    'scenes.sceneables' => function ($q) {
                        $q->select('id', 'scene_id');},
                    'scenes.mymedia',
                ])->get(array('loci.id', 'locus_no', 'loci.area_season_id', 'loci.description', 'areas_seasons.tag'));

        //format response, add tag, choose single media
        $media = null;
        foreach ($loci as $index => $locus) {
            $locus->{"tag"} = $locus->tag . '/' . $locus->locus_no;

            if (empty($locus->scenes)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (empty($locus->scenes->first()->mymedia)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (is_null($locus->scenes->first()->mymedia->first())) {
                $media[$index] = (object) ["status" => "no_media"];
            } else {
                $media[$index] = $locus->scenes->first()->mymedia->first();
                $media[$index]->{"status"} = "ready"; //clone $locus->scenes[0]->mymedia[0];
            }
            foreach ($locus->scenes as $scene) {
                $scene->mymedia = null;
            }
            //unset($locus->areaSeason);

            //TODO unset internal elements
            unset($locus->scenes);
        }

        return response()->json([
            "collection" => $loci,
            "media" => $media], 200);
    }

    public function query()
    {
        //since we need to sort by foreign table columns, we must use a joint
        $loci = Locus::leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc')
            ->with(
                [
                    'scenes',
                    'scenes.sceneables' => function ($q) {
                        $q->select('id', 'scene_id');},
                    'scenes.mymedia',
                ])->get(array('loci.id', 'locus_no', 'loci.area_season_id', 'loci.description', 'areas_seasons.tag'));

        //format response, add tag, choose single media
        $media = $collectionMedia = [];
        
        foreach ($loci as $index => $locus) {
            $locus->{"tag"} = $locus->tag . '/' . $locus->locus_no;

            if (empty($locus->scenes)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (empty($locus->scenes->first()->mymedia)) {
                $media[$index] = (object) ["status" => "no_media"];
            } elseif (is_null($locus->scenes->first()->mymedia->first())) {
                $media[$index] = (object) ["status" => "no_media"];
            } else {
                $media[$index] = $locus->scenes->first()->mymedia->first();
                $media[$index]->{"status"} = "ready"; //clone $locus->scenes[0]->mymedia[0];
            }

            //new collectionMedia implementation
            $itemMedia = null;

            foreach ($locus->scenes as $scene) {
                foreach ($scene->media as $mediaItem) {
                    $itemMedia = (object) ['fullUrl' => $mediaItem->getFullUrl(), 'tnUrl' => $mediaItem->getFullUrl('tn'), 'status' => 'ready'];
                    break 2;
                }
            }

            if (is_null($itemMedia)) {
                $collectionMedia[$index] = (object) ["status" => "no_media"];
            } else {
                $collectionMedia[$index] = $itemMedia;
            }
            foreach ($locus->scenes as $scene) {
                $scene->mymedia = null;
            }
            //unset($locus->areaSeason);

            //TODO unset internal elements
            unset($locus->scenes);
        }

        return response()->json([
            "collection" => $loci,
            "media" => $media,
            "collectionMedia" => $collectionMedia,
        ], 200);
    }

    //used by findNewRgistration
    public function finds(Request $request, $id)
    {
        $find_type = $request->input('find_type');
        $locus = Locus::with([
            'finds' => function ($q) use ($find_type) {
                $q->select('locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type')->where('findable_type', $find_type);},
        ])->findOrFail($id);

        return response()->json([
            "finds" => $locus->finds,
        ], 200);
    }

    public function show($id)
    {
        $locus = Locus::with(
            ['areaSeason' => function ($q) {
                $q->select('id', 'tag');},
                'finds' => function ($q) {
                    $q->select('locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type', 'findable_id', 'description')
                    ->orderBy('findable_type', 'ASC')
                    ->orderBy('registration_category', 'ASC')
                    ->orderBy('basket_no', 'ASC')
                    ->orderBy('item_no', 'ASC');},
                'scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media',
            ])->findOrFail($id);

        $locus->{"tag"} = $locus->areaSeason->tag . '/' . $locus->locus_no;

        $scenes = $locus->scenes;

        foreach ($scenes as $scene) {
            $sceneTag = "";
            foreach ($scene->sceneables as $item) {
                $sceneTag .= $item->sceneable_type . ':' . $item->sceneable_id . ' ';
            }

            $scene->{"tag"} = $sceneTag;
            unset($scene->pivot);
            foreach ($scene->mymedia as $mediaItem) {
                unset($mediaItem->scene_id);
            }
        }
        $media = (object) [
            "scenes" => $scenes,
        ];

        //new itemMedia implementation
        $itemMedia = [];

        foreach ($scenes as $scene) {
            if ($scene->media) {
                unset($scene->pivot);
                foreach ($scene->media as $mediaItem) {
                    array_push($itemMedia, ['fullUrl' => $mediaItem->getFullUrl(), 'tnUrl' => $mediaItem->getFullUrl('tn'), 'media_id' => $mediaItem->id]);
                }
            }
        }

        unset($locus->scenes);
        





        //LocusFinds
        $locusFinds = $locus->finds;       
        $locusFindsMedia1 = $locusFindsMedia = null;
        
        foreach ($locusFinds as $index => $locusFind) {
            //$locusFind{"media"} = $this->image($locusFind);
            $locusFindsMedia[$index] = ($this->mediaItem($locusFind))->mediaItem;
            $locusFindsMedia1[$index] = ($this->mediaItem($locusFind))->findMediaItem;
            $locusFind{"tag"} = '(' . $locusFind->findable_type . ') ' . $locusFind->registration_category . '.' . ($locusFind->basket_no ? $locusFind->basket_no : "") . (($locusFind->basket_no && $locusFind->item_no) ? "." : "") . ($locusFind->item_no ? $locusFind->item_no : "");
        }
        
        unset($locus->finds);

        return response()->json([
            "item" => $locus,
            "media" => $media,
            "locusFinds" => $locusFinds,
            "locusFindsMedia" => $locusFindsMedia, 
            "locusFindsMedia1" => $locusFindsMedia1,
            "itemMedia" => $itemMedia,
        ], 200);
    }

    protected function mediaItem($find)
    {
        $instance = null;
        $class = '\App\Models\Finds\\' . $find->findable_type;
        $instance = new $class;

        //$instance->select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia',  'scenes.media'])->findOrFail($find->findable_id);

        switch ($find->findable_type) {
            case 'Fauna':
                $instance = Fauna::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Flora':
                $instance = Flora::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Glass':
                $instance = Glass::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Lithic':
                $instance = Lithic::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Metal':
                $instance = Metal::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Pottery':
                $instance = Pottery::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Stone':
                $instance = Stone::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            case 'Tbd':
                $instance = Tbd::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.mymedia', 'scenes.media'])->findOrFail($find->findable_id);
                break;
            default:
                return "Failed to create " . $find->findable_type . " instance.";
        }

        //old
        $mediaItem = null;

        foreach ($instance->scenes as $scene) {
            if (count($scene->sceneables) == 1) {
                $mediaItem = $scene->mymedia->first();
                $mediaItem{"status"} = "ready";
                break;
            }
        }
        $mediaItem = $mediaItem ? $mediaItem : (object) ["status" => "no_media"];
        
        //new  
        $findMediaItem = null;

        foreach ($instance->scenes as $scene) {
            foreach ($scene->media as $mediaItem) {
                $findMediaItem = (object) ['fullUrl' => $mediaItem->getFullUrl(), 'tnUrl' => $mediaItem->getFullUrl('tn'), 'status' => 'ready'];
                break 2;
            }
        }

        if (is_null($findMediaItem)) {
            $findMediaItem = (object) ["status" => "no_media"];
        }
        
        
        
        return (object) ['mediaItem' => $mediaItem, 'findMediaItem' => $findMediaItem];
        //return $mediaItem ? $mediaItem : (object) ["status" => "no_media"];
    }

    public function store(LocusRequest $request)
    {
        $validated = $request->validated();

        if ($request->isMethod('put')) {
            $locus = Locus::findOrFail($request->input('id'));
        } else {
            $locus = new Locus;
        }

        $locus->area_season_id = $validated["area_season_id"];
        $locus->locus_no = $validated["locus_no"];
        $locus->square = $validated["square"];
        $locus->date_opened = $validated["date_opened"];
        $locus->date_closed = $validated["date_closed"];
        $locus->level_opened = $validated["level_opened"];
        $locus->level_closed = $validated["level_closed"];
        $locus->locus_above = $validated["locus_above"];
        $locus->locus_below = $validated["locus_below"];
        $locus->locus_co_existing = $validated["locus_co_existing"];
        $locus->description = $validated["description"];
        $locus->deposit = $validated["deposit"];
        $locus->registration_notes = $validated["registration_notes"];

        $locus->save();

        if ($request->isMethod('post')) {
            //if new locus, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            $areaSeason = AreaSeason::findOrFail($locus->area_season_id);
            $locus->{"tag"} = $areaSeason->tag . '/' . $locus->locus_no;
            unset($locus->square);
            unset($locus->date_opened);
            unset($locus->date_closed);
            unset($locus->level_opened);
            unset($locus->level_closed);
            unset($locus->locus_above);
            unset($locus->locus_below);
            unset($locus->locus_co_existing);
            unset($locus->deposit);
            unset($locus->registration_notes);
        }

        return response()->json([
            "item" => $locus,
        ], 200);
    }

    public function destroy($id)
    {
        $locus = Locus::findOrFail($id);
        if ($locus->delete()) {

            return response()->json([
                "item" => $locus,
            ], 200);
            //return new LocusResource($locus);
        }
    }

    public function summary()
    {
        $itemCount = Locus::count();

        $imageCount = Scene::withCount(['mymedia', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Locus');}])->get()->reduce(function ($carry, $item) {
            $carry += ($item->sceneables_count > 0) ? $item->mymedia_count : 0;
            return $carry;
        });

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
