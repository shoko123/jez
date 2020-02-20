<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Locus as LocusResource;
use App\Http\Requests\LocusRequest;

use App\Models\Area;
use App\Models\Locus;
use App\Models\Finds\Fauna;
use App\Models\Finds\Flora;
use App\Models\Finds\Glass;
use App\Models\Finds\Lithic;
use App\Models\Finds\Metal;
use App\Models\Finds\Pottery;
use App\Models\Finds\Shell;
use App\Models\Finds\Stone;
use App\Models\Finds\Tbd;

use App\Models\Image\Scene;


class LocusController extends Controller
{
    public function index()
    {
        //since we need to sort by foreign table columns, we must use a joint
        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
            ->orderBy('areas.id', 'asc')
            ->orderBy('loci.locus', 'asc')
            ->get(array('loci.id', 'loci.locus  AS locus_no', 'loci.area_id', 'loci.description', 'areas.tag'));

        //format response, add tag
        foreach ($loci as $locus) {
            //$tag = $locus->tag . '/' . $locus->locus;
            $locus->{"tag"} = $locus->tag . '/' . $locus->locus_no;//$tag;
            //unset($locus->locus);
            //unset($locus->year);
            //unset($locus->area);
        }

        return response()->json([
            "collection" => $loci], 200);
    }

    //used by findNewRgistration
    public function finds(Request $request, $id)
    {
        $find_type = $request->input('find_type');
        $locus = Locus::with([
                'finds' => function ($q) use ($find_type){
                    $q->select('id', 'locus_id', 'registration_category', 'basket_no', 'item_no','findable_type')->where('findable_type', $find_type);},               
            ])->findOrFail($id);

        return response()->json([
            "finds" => $locus->finds,
        ], 200);
    }

    public function show($id)
    {
        $locus = Locus::with(
            ['area' => function ($q) {
                $q->select('id', 'tag');},
                'finds' => function ($q) {
                    $q->select('id', 'locus_id', 'registration_category', 'basket_no', 'item_no', 'findable_type', 'findable_id', 'description');},
                'scenes', 'scenes.sceneables', 'scenes.images',
            ])->findOrFail($id);

        //$tag = $locus->area->tag . '/' . $locus->locus;
        $locus->{"tag"} = $locus->area->tag . '/' . $locus->locus;//$tag;
        $locus->{"locus_no"} = $locus->locus;
        unset($locus->locus);

        ///
        $scenes = $locus->scenes;

        foreach ($scenes as $scene) {
            $sceneTag = "";
            foreach ($scene->sceneables as $item) {
                $sceneTag .= $item->sceneable_type . ':' . $item->sceneable_id . ' ';
            }

            $scene->{"tag"} = $sceneTag;
            unset($scene->pivot);
            foreach ($scene->images as $image) {
                unset($image->scene_id);
            }
        }

        unset($locus->scenes);
        $media = (object) [
            "scenes" => $scenes,
            'illustrations' => [],
            'plans' => [],
        ];

        //sort finds by type, category, basket, and item numbers and format tags and images for each find.
        $finds = $locus->finds;
        foreach ($finds as $key => $find) {
            $find{"image"} = $this->image($find);
            $find{"tag"} = '(' . $find->findable_type . ') ' . $find->registration_category . '.' . ($find->basket_no ? $find->basket_no : "") . (($find->basket_no && $find->item_no) ? "." : "") . ($find->item_no ? $find->item_no : "");
        }
        $findsJson = json_decode($finds);

        $findable_type = array_column($findsJson, 'findable_type');
        $registration_category = array_column($findsJson, 'registration_category');
        $basket_no = array_column($findsJson, 'basket_no');
        $item_no = array_column($findsJson, 'item_no');

        array_multisort($findable_type, SORT_STRING, $registration_category, SORT_ASC, $basket_no, SORT_ASC, $item_no, SORT_ASC, $findsJson);

        unset($locus->finds);
   
        return response()->json([
            "item" => $locus,
            "media" => $media,
            "locusFinds" => $findsJson,
        ], 200);
    }

    protected function image($find)
    {
        $instance = null;
        $class = '\App\Models\Finds\\' . $find->findable_type;
        $instance = new $class;

        //$instance->select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);

        switch ($find->findable_type) {
            case 'Fauna':
                $instance = Fauna::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Flora':
                $instance = Flora::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Glass':
                $instance = Glass::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Lithic':
                $instance = Lithic::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Metal':
                $instance = Metal::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Pottery':
                $instance = Pottery::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Shell':
                $instance = Shell::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Stone':
                $instance = Stone::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            case 'Tbd':
                $instance = Tbd::select('id')->with(['scenes', 'scenes.sceneables', 'scenes.images'])->findOrFail($find->findable_id);
                break;
            default:
                return "Failed to create " . $find->findable_type . " instance.";
        }

        $images = $image = null;

        foreach ($instance->scenes as $scene) {
            if (count($scene->sceneables) == 1) {
                $images = $scene->images;
                break;
            }
        }
        if (!$images) {
            return null;
        }
        $image = $images[0];
        $full = str_pad($image->id, 6, "0", STR_PAD_LEFT) . "." . $image->extension;
        $thumbnail = str_pad($image->id, 6, "0", STR_PAD_LEFT) . "_tn." . $image->extension;
        $srcFull = 'http://jez/storage/DB/images/full/' . $full;
        $srcThumbnail = 'http://jez/storage/DB/images/thumbnails/' . $thumbnail;
        $image->{"srcFull"} = $srcFull;
        $image->{"srcThumbnail"} = $srcThumbnail;
        return $image;
    }

    public function store(LocusRequest $request)
    {
        $validated = $request->validated();

        if ($request->isMethod('put')) {
            $locus = Locus::findOrFail($request->input('id'));
        } else {
            $locus = new Locus;
        }

        $locus->area_id = $validated["area_id"];
        $locus->locus = $validated["locus_no"];
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
            $area = Area::findOrFail($locus->area_id);       
            $locus->{"tag"} =$area->tag . '/' . $locus->locus;
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

    public function lociForArea($area_id)
    {
        $locus = Locus::findOrFail($id);
        //NO NO
        return $locus;
    }

    public function summary()
    {
        $itemCount = Locus::count();

        $imageCount = Scene::withCount(['images', 'sceneables' => function ($query) {
            $query->where('sceneable_type', 'Locus');}])->get()->reduce(function ($carry, $item) {         
                $carry += ($item->sceneables_count > 0) ? $item->images_count : 0;
                return $carry;
            });

        $summary = (object)['itemCount' => $itemCount, 'imageCount' => $imageCount];
                
        return response()->json([
            "summary" => $summary],
            200);
    }
}
