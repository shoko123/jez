<?php

namespace App\Services\App\Configs;

use App\Services\App\Configs\MediaConfig;
use App\Services\App\Configs\ModulesConfig;

class AppInitConfigs
{
    public static function get()
    {
        return [
            'configs' => [
                'bucketUrl' => env('S3_BUCKET_URL'),
                'googleMapsApiKey' => env('GOOGLE_MAPS_API_KEY'),
                'mediaCollectionNames' => MediaConfig::mediaCollectionNames(),
                'appName' => env('APP_NAME'),
                'primaryKey' => [
                    'surrogate' => true,
                    'autoIncrement' => ModulesConfig::autoIncrementId()
                ]
            ],
            'modules' => ModulesConfig::modules(),
            'accessibility' => [
                'readOnly' => env('ACCESSIBILITY_READ_ONLY'),
                'authenticatedUsersOnly' => env('ACCESSIBILITY_AUTHENTICATED_ONLY'),
                'registrationAlowed' => env('ACCESSIBILITY_ALLOW_REGISTRATION')
            ],
        ];
    }
}
