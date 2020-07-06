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

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('permissions', 'AuthController@permissions');
});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    Route::get('areas', 'AreaSeasonController@index');
    Route::get('areas/{id}/areaLoci', 'AreaSeasonController@areaLoci');

    //loci
    Route::get('loci', 'LocusController@index');
    Route::post('loci/query', 'LocusController@query');
    Route::get('loci/summary', 'LocusController@summary');
    Route::get('loci/{id}', 'LocusController@show');
    Route::get('loci/{id}/finds', 'LocusController@finds');
    
    
    Route::post('loci/store', 'LocusController@store');
    Route::put('loci/store', 'LocusController@store');
    
    Route::delete('loci/{id}', 'LocusController@destroy');
    
    
    //Stones
    Route::get('stones', 'StoneController@index');
    Route::post('stones/query', 'StoneController@query');
    Route::get('stones/sort', 'StoneController@sort');
    Route::get('stones/summary', 'StoneController@summary');
    Route::get('stones/{id}', 'StoneController@show');
    
    Route::post('stones/store', 'StoneController@store');
    Route::put('stones/store', 'StoneController@store');
    
    Route::delete('stones/{id}', 'StoneController@destroy');
    
    //Pottery
    Route::get('pottery', 'PotteryController@index');
    Route::post('pottery/query', 'PotteryController@query');
    Route::get('pottery/summary', 'PotteryController@summary');
    Route::get('pottery/{id}', 'PotteryController@show');
    Route::post('pottery/store', 'PotteryController@store');
    Route::put('pottery/store', 'PotteryController@store');
    Route::delete('pottery/{id}', 'PotteryController@destroy');

    //Finds
    Route::get('finds', 'FindController@index');
    
    //scenes
    Route::get('scenes', 'SceneController@index');
    Route::get('scenes/{id}', 'SceneController@show');

    Route::post('media/store', 'MediaController@store');
    Route::delete('media', 'MediaController@destroy');

    Route::post('scenes/store', 'SceneController@store');
    Route::post('files/store', 'FileController@store');
    Route::post('files/storeMultiple', 'FileController@storeMultiple'); //formData
    Route::delete('files', 'FileController@destroy');

    //tags
    Route::post('tags/store', 'TagController@store');
    Route::post('tags/query', 'TagController@query');


});
