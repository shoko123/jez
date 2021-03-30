<?php

namespace App\Http\Controllers;

use App\Models\Dig\Stone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
            $itemMedia = $this->model->itemMediaCollection($item_type, $item);

            return response()->json([
                "message" => "succesfully stored media",
                "itemMedia" => $itemMedia,
            ]);

        } catch (\Exception $error) {
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
        $itemMedia = $this->model->itemMediaCollection($item_type, $item);

        return response()->json([
            "message" => "succesfully deleted media",
            "itemMedia" => $itemMedia,
        ], 200);
    }

    public function app_media(Request $request)
    {
        $backgroundUrls = [];

        $myModels = array("App", "About", "Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass", "Flora", "Fauna", "Tbd");

        foreach ($myModels as $modelName) {
            $fullMediaName = 'backgrounds/' . $modelName . '.jpg';
            $thumbMediaName = 'backgrounds/' . $modelName . '-tn.jpg';
            //$backgroundUrls[$modelName] = \Storage::disk('app-media')->url($fullMediaName);

            $backgroundUrls[$modelName] = (object) [
                'fullUrl' => \Storage::disk('app-media')->url($fullMediaName),
                'tnUrl' => \Storage::disk('app-media')->url($thumbMediaName),
            ];
        }
        $carouselItems = [];
        $carouselTexts = ["Welcome! This website displays the results of an 8-year expedition to Tel-Ein-Jezreel.",
                          "It is aimed at a fuller expopsure of the dig`s data than available in paper format.",
                          "We strive to facilitate intuitive search and links to context data", 
                          "The database was design from its inception to be media rich.",
                           "I am very tired and fat.",
                            "",
                             ""];

        foreach ($carouselTexts as $index => $text) {
            $fullMediaName = 'carousel/item' . $index . '.jpg';
            $thumbMediaName = 'carousel/item' . $index . '-tn.jpg';
            array_push($carouselItems, (object) ['text' => $text, 
            'fullUrl' => \Storage::disk('app-media')->url($fullMediaName), 
            'tnUrl' => \Storage::disk('app-media')->url($fullMediaName)]);
        }

        return response()->json([
            "message" => "succesfully loaded app_media",
            "appMedia" => [
                "backgroundUrls" => $backgroundUrls,
                "carouselItems" => $carouselItems,
            ],
        ], 200);
    }

    public function primary(Request $request)
    {
        $media = Media::where('model_type', $request["model"])->where('model_id', $request["id"])->get();
        $drawing = $item->getFirstMedia('drawing');

        if (empty($media)) {
            $fullMediaName = 'fillers/' . $modelName . '0.jpg';
            $tnMediaName = 'fillers/' . $modelName . '0-tn.jpg';
            $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
            $tnUrl = \Storage::disk('app-media')->url($tnMediaName);
            $primary = (object) [
                'hasMedia' => false,
                'fullUrl' => $fullUrl,
                'tnUrl' => $tnUrl,
            ];
            return response()->json([
                "primary" => $primary,
            ], 200);
        }
        




   $primary = (object)[
                'hasMedia' => true,
                'fullUrl' => $media[0]->getFullUrl(),
                'tnUrl' => $media[0]->getFullUrl('tn'),
            ];
        return response()->json([
            "primary" => $primary,
        ], 200);




        if (!empty($drawing)) {
            return (object) [
                'hasMedia' => TRUE,
                'fullUrl' => $drawing->getFullUrl(),
                'tnUrl' => $drawing->getFullUrl(),
            ];
        } else {
            $photo = $item->getFirstMedia('photo');
            if (!empty($photo)) {
                return (object) [
                    'hasMedia' => TRUE,
                    'fullUrl' => $photo->getFullUrl(),
                    'tnUrl' => $photo->getFullUrl('tn'),
                ];
            } else {
                //construct filler images
                $fullMediaName = 'fillers/' . $modelName . '0.jpg';
                $tnMediaName = 'fillers/' . $modelName . '0-tn.jpg';
                $fullUrl = \Storage::disk('app-media')->url($fullMediaName);
                $tnUrl = \Storage::disk('app-media')->url($tnMediaName);
                return (object) [
                    'hasMedia' => FALSE,
                    'fullUrl' => $fullUrl,
                    'tnUrl' => $tnUrl,
                ];
            }
        }
    }
}
