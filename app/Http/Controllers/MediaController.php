<?php

namespace App\Http\Controllers;

use App\Models\Dig\Stone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    protected $model;

    //we get the stone model in order to use its MediaTrait
    public function __construct(Stone $model)
    {
        $this->model = $model;
    }

    public function store(Request $request)
    {
        //basic validation and authorization
        $validatedRequest = $request->validate([
            'item_type' => [Rule::in(['Area', 'Season', 'AreaSeason', 'Locus', 'Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'id' => 'numeric',
            'media_type' => [Rule::in(['photo', 'drawing', 'plan'])],
            'media_files' => 'required|array',
        ]);

        $user = Auth::user();
        $permission = $validatedRequest["item_type"] . "-media";

        if (!$user->hasPermissionTo($permission, 'api')) {
            return response()->json([
                "message" => $user,
            ], 405);
        }

        try {
            $id = $validatedRequest["id"];
            $item_type = $validatedRequest["item_type"];
            $media_type = $validatedRequest["media_type"];
            //TODO checks on above

            $itemModelName = 'App\Models\Dig\\' . $item_type;

            $item = $itemModelName::findOrFail($id);

            //attach media to item
            foreach ($request->media_files as $key => $media_file) {
                $item
                    ->addMedia($media_file)
                    ->toMediaCollection($media_type);
            }

            //reload updated media collection for item
            $item = $itemModelName::with('media')->findOrFail($id);
            $itemMedia = $this->model->allMedia($item);
            $primaryMedia = $this->model->primaryMedia($item);

            return response()->json([
                "message" => "succesfully stored media",
                "primary" => $primaryMedia,
                "collection" => $itemMedia->collection,
                "item_id" => $id,
            ]);

        } catch (\Exception$error) {
            return response()->json(["error" => $error->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        //Get item of image.
        $item_type = ($request["item_type"]);
        $id = ($request["id"]);
        $itemModelName = 'App\Models\Dig\\' . $item_type;

        //Get media record and delete it.
        $mediaToDelete = Media::findOrFail($request["media_id"]);
        $mediaToDelete->delete();

        //reload updated media collection for item
        $item = $itemModelName::with('media')->findOrFail($id);
        $itemMedia = $this->model->allMedia($item);
        $primaryMedia = $this->model->primaryMedia($item);

        return response()->json([
            "message" => "succesfully deleted media",
            "primary" => $primaryMedia,
            "collection" => $itemMedia->collection,
            "item_id" => $id,
        ], 200);
    }

    public function getAppMedia(Request $request)
    {
        $backgroundUrls = [];

        $myModels = array("Auth", "About", "Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass", "Flora", "Fauna", "Tbd");

        foreach ($myModels as $modelName) {
            $fullMediaName = 'backgrounds/' . $modelName . '.jpg';
            $thumbMediaName = 'backgrounds/' . $modelName . '-tn.jpg';
            //$backgroundUrls[$modelName] = \Storage::disk('app-media')->url($fullMediaName);

            $backgroundUrls[$modelName] = (object) [
                'fullUrl' => Storage::disk('app-media')->url($fullMediaName),
                'tnUrl' => Storage::disk('app-media')->url($thumbMediaName),
            ];
        }

        $carouselItems = [];
        for ($index = 0; $index <= 6; $index++) {
            $fullMediaName = 'carousel/item' . $index . '.jpg';
            $thumbMediaName = 'carousel/item' . $index . '-tn.jpg';
            array_push($carouselItems, (object) [
                'fullUrl' => Storage::disk('app-media')->url($fullMediaName),
                'tnUrl' => Storage::disk('app-media')->url($fullMediaName)]);
        }

        return response()->json([
            "message" => "succesfully initiated app_media (carousel item, etc...)",
            "appMediaUrl" => env('APP_URL') . '/app-media',
            "carousel" => $carouselItems,
        ], 200);
    }
}
