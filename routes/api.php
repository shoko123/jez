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

Route::get('media/app_media', 'MediaController@app_media');

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('permissions', 'AuthController@permissions');
});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    Route::post('module-initializer', 'ModuleInitializerController@index');
    
    //Route::match(['get', 'post'], '/areas-seasons', 'AreaSeasonController@index');
    Route::get('areas-seasons', 'AreaSeasonController@index');
    Route::post('areas-seasons', 'AreaSeasonController@index');
    Route::get('areas-seasons/{id}/loci', 'AreaSeasonController@loci');
  
    //loci
    Route::post('loci', 'LocusController@index');
    Route::get('loci/summary', 'LocusController@summary');
    Route::get('loci/{id}', 'LocusController@show');
    Route::get('loci/{id}/finds', 'LocusController@finds');
    Route::post('loci/store', 'LocusController@store');
    Route::put('loci/store', 'LocusController@store');
    Route::delete('loci/{id}', 'LocusController@destroy');

    //Stones
    Route::post('stones', 'StoneController@index');
    Route::get('stones/summary', 'StoneController@summary');
    Route::get('stones/{id}', 'StoneController@show');
    Route::post('stones/store', 'StoneController@store');
    Route::put('stones/store', 'StoneController@store');
    Route::delete('stones/{id}', 'StoneController@destroy');

    //Pottery
    Route::post('pottery', 'PotteryController@index');
    Route::get('pottery/summary', 'PotteryController@summary');
    Route::get('pottery/{id}', 'PotteryController@show');
    Route::post('pottery/store', 'PotteryController@store');
    Route::put('pottery/store', 'PotteryController@store');
    Route::delete('pottery/{id}', 'PotteryController@destroy');

    //Lithics
    Route::post('lithics', 'LithicController@index');
    Route::get('lithics/summary', 'LithicController@summary');
    Route::get('lithics/{id}', 'LithicController@show');
    Route::post('lithics/store', 'LithicController@store');
    Route::put('lithics/store', 'LithicController@store');
    Route::delete('lithics/{id}', 'LithicController@destroy');

    //glass
    Route::post('glass', 'GlassController@index');
    Route::get('glass/summary', 'GlassController@summary');
    Route::get('glass/{id}', 'GlassController@show');
    Route::post('glass/store', 'GlassController@store');
    Route::put('glass/store', 'GlassController@store');
    Route::delete('glass/{id}', 'GlassController@destroy');

    //metals
    Route::post('metals', 'MetalController@index');
    Route::get('metals/summary', 'MetalController@summary');
    Route::get('metals/{id}', 'MetalController@show');
    Route::post('metals/store', 'MetalController@store');
    Route::put('metals/store', 'MetalController@store');
    Route::delete('metals/{id}', 'MetalController@destroy');

    //media
    Route::post('media/store', 'MediaController@store');
    Route::delete('media', 'MediaController@destroy');

    //tags
    Route::post('tags/sync', 'TagController@sync');
});
