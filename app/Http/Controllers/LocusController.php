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
use App\Models\Locus;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class LocusController extends Controller
{
    public function query()
    {
        //since we need to sort by foreign table columns, we must use a joint
        $loci = Locus::leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc')
            ->with('media')
            ->get(array('loci.id', 'locus_no', 'loci.area_season_id', 'loci.description', 'areas_seasons.tag'));

        //format response, add tag, choose single media
        $collectionMedia = [];

        foreach ($loci as $index => $locus) {
            $locus->{"tag"} = $locus->tag . '/' . $locus->locus_no;

            //get related media
            $firstMedia = $locus->getFirstMedia('photo');

            if (empty($firstMedia)) {
                $collectionMedia[$index] = (object) ["status" => "no_media"];
            } else {
                $fullUrl = $firstMedia->getFullUrl();
                $tnUrl = $firstMedia->getFullUrl('tn');
                $collectionMedia[$index] = (object) [
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                    'status' => 'ready'];
            }
            unset($locus->media);
        }

        return response()->json([
            "collection" => $loci,
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
                'media',
            ])->findOrFail($id);

        $locus->{"tag"} = $locus->areaSeason->tag . '/' . $locus->locus_no;

        //related media
        $itemMedia = [];

        $allMedia = $locus->getMedia('photo');
        foreach ($allMedia as $mediaItem) {
            $fullUrl = $mediaItem->getFullUrl();
            $tnUrl = $mediaItem->getFullUrl('tn');
            array_push($itemMedia, ['fullUrl' => $fullUrl, 'tnUrl' => $tnUrl, 'status' => 'ready', 'media_id' => $mediaItem->id]);
        }

        //LocusFinds
        $locusFindsMedia = [];

        foreach ($locus->finds as $index => $locusFind) {
            $locusFindsMedia[$index] = $this->mediaItem($locusFind);
        }

        unset($locus->finds);

        return response()->json([
            "item" => $locus,
            "locusFindsMedia" => $locusFindsMedia,
            "itemMedia" => $itemMedia,
            "tags" => [],
        ], 200);
    }

    protected function mediaItem($find)
    {      
        $findModelName = 'App\Models\Finds\\' . $find->findable_type;
        $instance = $findModelName::where('id', $find->findable_id)->first();
       
        $findMediaItem = null;

        //get tag
        $tag = '(' . $find->findable_type . ') ' . $find->registration_category . '.' . ($find->basket_no ? $find->basket_no : "") . (($find->basket_no && $find->item_no) ? "." : "") . ($find->item_no ? $find->item_no : "");

        //get related media and all data needed for gallery display of find.
        $firstMedia = $instance->getFirstMedia('photo');

        if (empty($firstMedia)) {
            $findMediaItem = (object) [
                'status' => 'no_media',
                'findable_type' => $find->findable_type,
                'findable_id' => $find->findable_id,
                'description' => $instance->description,
                'tag' => $tag,
            ];
        } else {
            $findMediaItem = (object) [
                'fullUrl' => $firstMedia->getFullUrl(),
                'tnUrl' => $firstMedia->getFullUrl('tn'),
                'status' => 'ready',
                'findable_type' => $find->findable_type,
                'findable_id' => $find->findable_id,
                'description' => $instance->description,
                'tag' => $tag,
            ];

        }
        return $findMediaItem;
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

        $imageCount = Media::where('model_type', 'Locus')->count();

        $summary = (object) ['itemCount' => $itemCount, 'imageCount' => $imageCount];

        return response()->json([
            "summary" => $summary],
            200);
    }
}
