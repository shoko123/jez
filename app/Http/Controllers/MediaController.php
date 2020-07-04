<?php

namespace App\Http\Controllers;

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
        
        //$class = '\App\Models\Finds\\' . $find->findable_type;
        //$instance = new $class;
        $item_id = json_decode($request["item_id"]);
        $item_type = json_decode($request["item_type"]);
        $media_type = json_decode($request["media_type"]);
        //sanity checks on above two
        $item = $this->getItem($item_type, $item_id);
        if(is_null($item)) {
             return response()->json([
            "message" => "media/store failed to find item"], 200);
        }

        //attach media to scene
        foreach ($request->media_files as $key => $media_file) {
            $item
            ->addMedia($media_file)
            ->toMediaCollection($media_type);
        }

        //get scene with new media
        $item = $this->getItem($item_type, $item_id);
        $media = $item->getMedia();

        return response()->json([
            "message" => "succesfully stored media",
            "media" => $media,
        ]);
    }

    protected function getItem($item_type, $item_id)
    {
        switch ($item_type) {
            case 'AreaSeason':
                $item = AreaSeason::findOrFail($item_id);
                break;
            case 'Locus':
                $item = Locus::findOrFail($item_id);
                break;
            case 'Fauna':
                $item = Fauna::findOrFail($item_id);
                break;
            case 'Flora':
                $item = Flora::findOrFail($item_id);
                break;
            case 'Glass':
                $item = Glass::findOrFail($item_id);
                break;
            case 'Lithic':
                $item = Lithic::findOrFail($item_id);
                break;
            case 'Metal':
                $item = Metal::findOrFail($item_id);
                break;
            case 'Pottery':
                $item = Pottery::findOrFail($item_id);
                break;
            case 'Stone':
                $item = Stone::findOrFail($item_id);
                break;
            case 'Tbd':
                $item = Tbd::findOrFail($item_id);
                break;
            default:
                return null;
        }
    }
}
