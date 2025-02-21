<?php

namespace App\Http\Controllers;

use App\Services\App\Services\MediaService;

class AppController extends BaseController
{
    /**
     * Init the app.
     */
    public function init()
    {
        return response()->json([
            'bucketUrl' => env('S3_BUCKET_URL'),
            'googleMapsApiKey' => env('GOOGLE_MAPS_API_KEY'),
            'accessibility' => [
                'readOnly' => env('ACCESSIBILITY_READ_ONLY'),
                'authenticatedUsersOnly' => env('ACCESSIBILITY_AUTHENTICATED_ONLY'),
            ],
            'media_collections' => MediaService::collection_names(),
            'app_name' => env('APP_NAME'),
        ], 200);
    }
}
