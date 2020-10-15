<?php

namespace App\Http\Controllers\Dig;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocusStoreRequest;
use App\Models\Dig\AreaSeason;
use App\Models\Dig\Locus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class LocusController extends Controller
{
    protected $model;

    public function __construct(Locus $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', $this->model);

        $builder = Locus::leftjoin('areas_seasons', 'loci.area_season_id', '=', 'areas_seasons.id')
            ->with('media');

        //filter by tags
        if (!empty($request["tagParams"])) {
            foreach ($request["tagParams"] as $param) {
                $names = [];
                foreach ($param["tags"] as $index => $tag) {
                    $names[$index] = $tag["name"];
                }
                $builder->withAnyTags($names, $param["type"]);
            }
        }

        //filter by media
        if (!empty($request["media"])) {
            $med = $request["media"];
            $builder->whereHas('media', function (Builder $mediaQuery) use ($med) {
                $mediaQuery->whereIn('collection_name', $med);
            });
        }

        //filter by area
        if (!empty($request["areas"])) {
            $builder->whereIn('area', $request["areas"]);
        }

        //filter by season
        if (!empty($request["seasons"])) {
            $builder->whereIn('season', $request["seasons"]);
        }

        //order
        $builder->orderBy('areas_seasons.id', 'asc')
            ->orderBy('loci.locus_no', 'asc');

        //get results
        $loci = $builder->get(['loci.id', 'locus_no', 'loci.area_season_id', 'loci.description', 'areas_seasons.tag']);

        foreach ($loci as $index => $item) {
            $item->tag = $item->tag . '/' . $item->locus_no;

            $media = $this->model->primaryMedia('Locus', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            unset($item->media);
        }

        return response()->json([
            "collection" => $loci,
        ], 200);
    }

    //used by findNewRgistration
    public function finds(Request $request, $id)
    {
        //TODO validation
        $find_type = $request->input('find_type');
        $locus = Locus::with([
            'finds' => function ($q) use ($find_type) {
                $q->select('locus_id', 'findable_type', 'findable_id', 'registration_category', 'basket_no', 'artifact_no', 'piece_no')->where('findable_type', $find_type);},
            'areaSeason',
        ])->findOrFail($id);

        $finds = [];

        //format finds tags
        foreach ($locus->finds as $index => $find) {
            $tag = $this->model->registrationTag((object) [
                "areaSeasonTag" => $locus->areaSeason->tag,
                "locusNo" => $locus->locus_no,
                "registrationCategory" => $find->registration_category,
                "basket_no" => $find->basket_no,
                "artifact_no" => $find->artifact_no,
                "piece_no" => $find->piece_no,
            ]);
            $new_find = clone $find;
            $new_find["tag"] = $tag;
            array_push($finds, $new_find);
        }
        return response()->json([
            "finds" => $finds,
        ], 200);

    }

    public function show($id)
    {
        $this->authorize('view', $this->model);

        $locus = Locus::with(
            ['areaSeason' => function ($q) {
                $q->select('id', 'tag');},
                'finds' => function ($q) {
                    $q->select('locus_id', 'findable_type', 'findable_id', 'registration_category', 'basket_no', 'artifact_no', 'piece_no', 'description')
                        ->orderBy('findable_type', 'ASC')
                        ->orderBy('registration_category', 'ASC')
                        ->orderBy('basket_no', 'ASC')
                        ->orderBy('artifact_no', 'ASC')
                        ->orderBy('piece_no', 'ASC');},
                'tags' => function ($query) {
                    $query->select('id', 'name', 'type');},
                'media',
            ])->findOrFail($id);

        $locus->tag = $locus->areaSeason->tag . '/' . $locus->locus_no;

        //get related media.
        $itemMedia = $this->model->itemMediaCollection('Locus', $locus);

        //LocusFinds
        $locusFinds = [];
        foreach ($locus->finds as $index => $find) {
            //format tag
            $tag = "(" . $find->findable_type . ") ";
            $tag .= $this->model->registrationTag((object) [
                "areaSeasonTag" => $locus->areaSeason->tag,
                "locusNo" => $locus->locus_no,
                "registrationCategory" => $find->registration_category,
                "basket_no" => $find->basket_no,
                "artifact_no" => $find->artifact_no,
                "piece_no" => $find->piece_no,
            ]);

            //load find instance with media and pick primary media item
            $findModelName = 'App\Models\Dig\\' . $find->findable_type;
            $instance = $findModelName::with('media')->findOrFail($find->findable_id);
            $findMediaItem = $this->model->primaryMedia($find->findable_type, $instance);
            $findMediaItem->tag = $tag; //'(' . $find->findable_type . ') ' . $find->registration_category . '.' . ($find->basket_no ? $find->basket_no : "") . (($find->basket_no && $find->artifact_no) ? "." : "") . ($find->artifact_no ? $find->artifact_no : "");
            $findMediaItem->findable_type = $find->findable_type;
            $findMediaItem->findable_id = $find->findable_id;
            $findMediaItem->description = $instance->description;
            array_push($locusFinds, $findMediaItem);
        }

        //get tags
        $tags = $tagIds = [];
        foreach ($locus->tags as $tag) {
            array_push($tags, ['id' => $tag->pivot->tag_id, 'name' => $tag->name, 'type' => $tag->type]);
            array_push($tagIds, $tag->pivot->tag_id);
        }

        unset($locus->finds);
        unset($locus->tags);
        return response()->json([
            "item" => $locus,
            "locusFinds" => $locusFinds,
            "itemMedia" => $itemMedia,
            "tags" => $tags,
            "tagIds" => $tagIds,
        ], 200);
    }

    public function store(LocusStoreRequest $request)
    {
        $validated = $request->validated();

        if ($request->isMethod('put')) {
            $this->authorize('update', $this->model);
            $locus = Locus::findOrFail($request->input('id'));
        } else {
            $this->authorize('create', $this->model);
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
        $locus->clean = $validated["clean"];
        $locus->description = $validated["description"];
        $locus->deposit = $validated["deposit"];
        $locus->registration_notes = $validated["registration_notes"];

        $locus->save();

        if ($request->isMethod('post')) {
            //if new locus, we format the respond so that it can be immediatly inserted into the "collection" without
            //extra formatting by client side.
            $areaSeason = AreaSeason::findOrFail($locus->area_season_id);
            $locus->tag = $areaSeason->tag . '/' . $locus->locus_no;
            unset($locus->square);
            unset($locus->date_opened);
            unset($locus->date_closed);
            unset($locus->level_opened);
            unset($locus->level_closed);
            unset($locus->locus_above);
            unset($locus->locus_below);
            unset($locus->locus_co_existing);
            unset($locus->clean);
            unset($locus->deposit);
            unset($locus->registration_notes);
        }

        return response()->json([
            "item" => $locus,
        ], 200);
    }

    public function destroy($id)
    {
        $this->authorize('delete', $this->model);

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
