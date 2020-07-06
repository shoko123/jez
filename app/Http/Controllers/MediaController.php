<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        $count = count($request->media_files);
        if ($count == 0) {
            return response()->json([
                "message" => "Media/store error - No files to store",
            ]);
        }

        $item_id = json_decode($request["item_id"]);
        $item_type = json_decode($request["item_type"]);
        $media_type = json_decode($request["media_type"]);

        //TODO checks on above

        $itemModelName = ($item_type == 'AreaSeason' || $item_type == 'Locus') ?
        'App\Models\\' . $item_type :
        'App\Models\Finds\\' . $item_type;

        $item = $itemModelName::findOrFail($item_id);

        //attach media to item
        foreach ($request->media_files as $key => $media_file) {
            $item
                ->addMedia($media_file)
                ->toMediaCollection($media_type);
        }

        //get new media collection for item
        $itemMedia = [];
        $allMedia = $item->getMedia('photo');
        foreach ($allMedia as $mediaItem) {
            $fullUrl = $mediaItem->getFullUrl();
            $tnUrl = $mediaItem->getFullUrl('tn');
            array_push($itemMedia, ['fullUrl' => $fullUrl, 'tnUrl' => $tnUrl, 'status' => 'ready', 'media_id' => $mediaItem->id]);
        }

        return response()->json([
            "message" => "succesfully stored media",
            "itemMedia" => $itemMedia,
        ]);
    }

    public function destroy(Request $request)
    {
        //Get item of image.
        $item_type = ($request["item_type"]);
        $item_id = ($request["item_id"]);
        $itemModelName = ($item_type == 'AreaSeason' || $item_type == 'Locus') ?
        'App\Models\\' . $item_type :
        'App\Models\Finds\\' . $item_type;
        $item = $itemModelName::findOrFail($item_id);

        //Get media record and delete it.
        $mediaToDelete = Media::findOrFail($request["media_id"]);
        $mediaToDelete->delete();

        //Get new media collection for item.
        $itemMedia = [];
        $allMedia = $item->getMedia('photo');
        foreach ($allMedia as $mediaItem) {
            $fullUrl = $mediaItem->getFullUrl();
            $tnUrl = $mediaItem->getFullUrl('tn');
            array_push($itemMedia, ['fullUrl' => $fullUrl, 'tnUrl' => $tnUrl, 'status' => 'ready', 'media_id' => $mediaItem->id]);
        }

        return response()->json([
            "message" => "succesfully deleted media",
            "itemMedia" => $itemMedia,
        ]);
    }
}
