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

});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    Route::get('areas', 'AreaController@index');
    Route::get('areas/loci', 'AreaController@loci');
    Route::get('areas/{id}/areaLoci', 'AreaController@areaLoci');
    

    Route::get('customers', 'CustomersController@all');

    Route::get('customers/{id}', 'CustomersController@get');
    Route::post('customers/new', 'CustomersController@new');

    //private APIs

    //loci
    Route::get('loci', 'LocusController@index');
    Route::get('loci/summary', 'LocusController@summary');
    Route::get('loci/{id}', 'LocusController@show');
    Route::get('loci/{id}/finds', 'LocusController@finds');
    
    
    Route::post('loci/store', 'LocusController@store');
    Route::put('loci/store', 'LocusController@store');
    
    Route::delete('loci/{id}', 'LocusController@destroy');
    
    
    //Stones
    Route::get('stones', 'StoneController@index');
    Route::get('stones/sort', 'StoneController@sort');
    Route::get('stones/summary', 'StoneController@summary');
    Route::get('stones/{id}', 'StoneController@show');
    
    Route::post('stones/store', 'StoneController@store');
    Route::put('stones/store', 'StoneController@store');
    
    Route::delete('stones/{id}', 'StoneController@destroy');
    
    
    
    //stoneTypes
    Route::get('stone-types', 'StoneTypeController@index');
    //Materials
    Route::get('materials', 'MaterialController@index');
    
    //Pottery
    Route::get('pottery', 'PotteryController@index');
    Route::get('pottery/summary', 'PotteryController@summary');
    Route::get('pottery/{id}', 'PotteryController@show');
    Route::post('pottery/store', 'PotteryController@store');
    Route::put('pottery/store', 'PotteryController@store');
    Route::delete('pottery/{id}', 'PotteryController@destroy');
    
    

    //Finds
    Route::get('finds', 'FindController@index');
    Route::get('finds/{id}/image', 'FindController@image');
    
    //scenes
    Route::get('scenes', 'SceneController@index');
    Route::get('scenes/{id}', 'SceneController@show');

    Route::post('scenes/create', 'SceneController@store');
    Route::post('files/store', 'FileController@store');
    Route::post('files/storeMultiple', 'FileController@storeMultiple'); //formData
    Route::delete('files', 'FileController@destroy');

});
