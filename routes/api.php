<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BaseDigModuleController;
use App\Http\Controllers\Dig\AboutController;
use App\Http\Controllers\Dig\AreaController;
use App\Http\Controllers\Dig\AreaSeasonController;
use App\Http\Controllers\Dig\GlassController;
use App\Http\Controllers\Dig\LithicController;
use App\Http\Controllers\Dig\LocusController;
use App\Http\Controllers\Dig\MetalController;
use App\Http\Controllers\Dig\PotteryController;
use App\Http\Controllers\Dig\SeasonController;
use App\Http\Controllers\Dig\StoneController;
use App\Http\Controllers\Dig\FaunaController;
use App\Http\Controllers\GlobalSettingsController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ModuleInitializerController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TestController;

//get bucket-url where assets are stored.
Route::get('media/bucket-url', [MediaController::class, 'getBucketUrl']);

//test (dev only)
Route::post('test', [TestController::class, 'test']);
Route::get('totals', [TestController::class, 'totals']);
Route::post('get-id', [TestController::class, 'getId']);
Route::post('url', [TestController::class, 'url']);
Route::post('store', [TestController::class, 'store']);
//open routes
Route::post('module-initializer', [ModuleInitializerController::class, 'index']);
Route::get('accessibility', [GlobalSettingsController::class, 'accessibility']);


//authorized users (depending on config/accessibility settings)
Route::group(['middleware' => 'authorizedUsersOnly'], function ($router) {
  
    Route::post('dig/show', [BaseDigModuleController::class, 'show']);
    Route::post('dig/chunk', [BaseDigModuleController::class, 'chunk']);

    Route::get('about', [AboutController::class, 'index']); //No params, always get all records.
    Route::post('areas', [AreaController::class, 'index']); //No params, always get all records.
    Route::post('seasons', [SeasonController::class, 'index']); //No params, always get all records.
    Route::post('areas-seasons', [AreaSeasonController::class, 'index']); //Pass query params in body.
    Route::post('loci', [LocusController::class, 'index']);
    Route::post('pottery', [PotteryController::class, 'index']);
    Route::post('lithics', [LithicController::class, 'index']);
    Route::post('stones', [StoneController::class, 'index']);
    Route::post('glass', [GlassController::class, 'index']);
    Route::post('metals', [MetalController::class, 'index']);
    Route::post('fauna', [FaunaController::class, 'index']);
});

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('permissions', [AuthController::class, 'permissions']);
});

//protected
Route::group(['middleware' => 'jwt.auth'], function ($router) {
    //media
    Route::post('media/store', [MediaController::class, 'store']);
    Route::delete('media', [MediaController::class, 'destroy']);

    //tags
    Route::post('tags/sync', [TagController::class, 'sync']);
    Route::post('tags/sync-module', [TagController::class, 'syncModule']);
    Route::put('tags/lookups', [TagController::class, 'lookups']);
    //areas
    Route::put('areas/store', [AreaController::class, 'store']); //Only updates allowed.

    //seasons
    Route::put('seasons/store', [SeasonController::class, 'store']); //Only updates allowed.

    //areas-seasons
    Route::get('areas-seasons', [AreaSeasonController::class, 'index']); //Used by registrar; gets all, as {id, tag}.
    Route::get('areas-seasons/{id}/loci', [AreaSeasonController::class, 'loci']); //Used by registrar, to avoid duplicate loci.
    Route::put('areas-seasons/store', [AreaSeasonController::class, 'store']); //Only updates allowed.

    //loci
    Route::get('loci', [LocusController::class, 'index']); //registration
    Route::get('loci/{id}/finds', [LocusController::class, 'finds']);
    Route::post('loci/store', [LocusController::class, 'store']);
    Route::put('loci/store', [LocusController::class, 'store']);
    Route::delete('loci/{id}', [LocusController::class, 'destroy']);

    //Pottery
    Route::post('pottery/store', [PotteryController::class, 'store']);
    Route::put('pottery/store', [PotteryController::class, 'store']);
    Route::delete('pottery/{id}', [PotteryController::class, 'destroy']);

    //Lithics
    Route::post('lithics/store', [LithicController::class, 'store']);
    Route::put('lithics/store', [LithicController::class, 'store']);
    Route::delete('lithics/{id}', [LithicController::class, 'destroy']);

    //Stones
    Route::post('stones/store', [StoneController::class, 'store']);
    Route::put('stones/store', [StoneController::class, 'store']);
    Route::delete('stones/{id}', [StoneController::class, 'destroy']);

    //glass
    Route::post('glass/store', [GlassController::class, 'store']);
    Route::put('glass/store', [GlassController::class, 'store']);
    Route::delete('glass/{id}', [GlassController::class, 'destroy']);

    //metals
    Route::post('metals/store', [MetalController::class, 'store']);
    Route::put('metals/store', [MetalController::class, 'store']);
    Route::delete('metals/{id}', [MetalController::class, 'destroy']);

     //fauna
     Route::post('fauna/store', [FaunaController::class, 'store']);
     Route::put('fauna/store', [FaunaController::class, 'store']);
     Route::delete('fauna/{id}', [FaunaController::class, 'destroy']);
});
