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
    
    Route::get('areas', 'AreaSeasonController@index');
    Route::get('areas/{id}/areaLoci', 'AreaSeasonController@areaLoci');

    //loci
    Route::post('loci/index', 'LocusController@index');
    Route::get('loci/summary', 'LocusController@summary');
    Route::get('loci/{id}', 'LocusController@show');
    Route::get('loci/{id}/finds', 'LocusController@finds');    
    Route::post('loci/store', 'LocusController@store');
    Route::put('loci/store', 'LocusController@store');    
    Route::delete('loci/{id}', 'LocusController@destroy');
    
    
    //Stones
    Route::post('stones/index', 'StoneController@index');
    Route::get('stones/summary', 'StoneController@summary');
    Route::get('stones/{id}', 'StoneController@show');    
    Route::post('stones/store', 'StoneController@store');
    Route::put('stones/store', 'StoneController@store');   
    Route::delete('stones/{id}', 'StoneController@destroy');
    
    //Pottery
    Route::post('pottery/index', 'PotteryController@index');
    Route::get('pottery/summary', 'PotteryController@summary');
    Route::get('pottery/{id}', 'PotteryController@show');
    Route::post('pottery/store', 'PotteryController@store');
    Route::put('pottery/store', 'PotteryController@store');
    Route::delete('pottery/{id}', 'PotteryController@destroy');

    //Lithics
    Route::post('lithics/index', 'LithicController@index');
    Route::get('lithics/summary', 'LithicController@summary');
    Route::get('lithics/{id}', 'LithicController@show');
    Route::post('lithics/store', 'LithicController@store');
    Route::put('lithics/store', 'LithicController@store');
    Route::delete('lithics/{id}', 'LithicController@destroy');
    
    Route::post('media/store', 'MediaController@store');
    Route::delete('media', 'MediaController@destroy');

    //tags
    Route::post('tags/sync', 'TagController@sync');
});
