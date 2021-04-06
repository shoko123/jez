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

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dig\AreaController;
use App\Http\Controllers\Dig\AreaSeasonController;
use App\Http\Controllers\Dig\GlassController;
use App\Http\Controllers\Dig\LithicController;
use App\Http\Controllers\Dig\LocusController;
use App\Http\Controllers\Dig\MetalController;
use App\Http\Controllers\Dig\PotteryController;
use App\Http\Controllers\Dig\SeasonController;
use App\Http\Controllers\Dig\StoneController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ModuleInitializerController;
use App\Http\Controllers\TagController;

//download media used by app before getting token.
Route::get('media/app-media', [MediaController::class, 'app_media']);

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('permissions', [AuthController::class, 'permissions']);
});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    //media
    Route::post('media/store', [MediaController::class, 'store']);
    Route::delete('media', [MediaController::class, 'destroy']);

    //tags
    Route::post('tags/sync', [TagController::class, 'sync']);

    Route::post('module-initializer', [ModuleInitializerController::class, 'index']);

    //areas
    Route::post('areas', [AreaController::class, 'index']); //No params, always get all records.
    Route::get('areas/{id}', [AreaController::class, 'show']);
    Route::put('areas/store', [AreaController::class, 'store']); //Only updates allowed.

    //seasons
    Route::post('seasons', [SeasonController::class, 'index']); //No params, always get all records.
    Route::get('seasons/{id}', [SeasonController::class, 'show']);
    Route::put('seasons/store', [SeasonController::class, 'store']); //Only updates allowed.

    //areas-seasons
    Route::get('areas-seasons', [AreaSeasonController::class, 'index']); //Used by registrar; gets all, as {id, tag}.
    Route::post('areas-seasons', [AreaSeasonController::class, 'index']); //Pass query params in body.
    Route::get('areas-seasons/{id}', [AreaSeasonController::class, 'show']);

    Route::get('areas-seasons/{id}/loci', [AreaSeasonController::class, 'loci']); //Used by registrar, to avoid duplicate loci.
    Route::put('areas-seasons/store', [AreaSeasonController::class, 'store']); //Only updates allowed.

    //loci
    Route::get('loci', [LocusController::class, 'index']);//registration
    Route::post('loci', [LocusController::class, 'index']);
    Route::post('loci/all', [LocusController::class, 'all']);
    Route::post('loci/chunk-media', [LocusController::class, 'chunkMedia']);
    Route::post('loci/chunk-table', [LocusController::class, 'chunkTable']);   
    Route::get('loci/{id}', [LocusController::class, 'show']);
    Route::get('loci/{id}/finds', [LocusController::class, 'finds']);
    Route::post('loci/store', [LocusController::class, 'store']);
    Route::put('loci/store', [LocusController::class, 'store']);
    Route::delete('loci/{id}', [LocusController::class, 'destroy']);

    //Pottery
    Route::post('pottery', [PotteryController::class, 'index']);
    Route::post('pottery/all', [PotteryController::class, 'all']);
    Route::post('pottery/chunk-media', [PotteryController::class, 'chunkMedia']);
    Route::post('pottery/chunk-table', [PotteryController::class, 'chunkTable']);
    Route::get('pottery/{id}', [PotteryController::class, 'show']);
    Route::post('pottery/store', [PotteryController::class, 'store']);
    Route::put('pottery/store', [PotteryController::class, 'store']);
    Route::delete('pottery/{id}', [PotteryController::class, 'destroy']);

    //Lithics
    Route::post('lithics', [LithicController::class, 'index']);
    Route::post('lithics/all', [LithicController::class, 'all']);
    Route::post('lithics/chunk-media', [LithicController::class, 'chunkMedia']);
    Route::post('lithics/chunk-table', [LithicController::class, 'chunkTable']);
    Route::get('lithics/{id}', [LithicController::class, 'show']);
    Route::post('lithics/store', [LithicController::class, 'store']);
    Route::put('lithics/store', [LithicController::class, 'store']);
    Route::delete('lithics/{id}', [LithicController::class, 'destroy']);

    //Stones
    Route::post('stones', [StoneController::class, 'index']);
    Route::post('stones/all', [StoneController::class, 'all']);
    Route::post('stones/chunk-media', [StoneController::class, 'chunkMedia']);
    Route::post('stones/chunk-table', [StoneController::class, 'chunkTable']);
    Route::get('stones/{id}', [StoneController::class, 'show']);
    Route::post('stones/store', [StoneController::class, 'store']);
    Route::put('stones/store', [StoneController::class, 'store']);
    Route::delete('stones/{id}', [StoneController::class, 'destroy']);

    //glass
    Route::post('glass', [GlassController::class, 'index']);
    Route::post('glass/all', [GlassController::class, 'all']);
    Route::post('glass/chunk-media', [GlassController::class, 'chunkMedia']);
    Route::post('glass/chunk-table', [GlassController::class, 'chunkTable']);
    Route::get('glass/{id}', [GlassController::class, 'show']);
    Route::post('glass/store', [GlassController::class, 'store']);
    Route::put('glass/store', [GlassController::class, 'store']);
    Route::delete('glass/{id}', [GlassController::class, 'destroy']);

    //metals
    Route::post('metals', [MetalController::class, 'index']);
    Route::post('metals/all', [MetalController::class, 'all']);
    Route::post('metals/chunk-media', [MetalController::class, 'chunkMedia']);
    Route::post('metals/chunk-table', [MetalController::class, 'chunkTable']);
    Route::get('metals/{id}', [MetalController::class, 'show']);
    Route::post('metals/store', [MetalController::class, 'store']);

    Route::put('metals/store', [MetalController::class, 'store']);
    Route::delete('metals/{id}', [MetalController::class, 'destroy']);

    //about
    Route::get('about', [AboutController::class, 'index']); //No params, always get all records.
    Route::get('about/{id}', [AboutController::class, 'show']);
});
