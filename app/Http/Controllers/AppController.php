<?php

namespace App\Http\Controllers;

use App\Services\App\Services\AppInitService;

class AppController extends BaseController
{
    /**
     * Init the app.
     */
    public function init()
    {
        return response()->json(AppInitService::init(), 200);
    }
}
