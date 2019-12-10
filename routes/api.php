<?php

use Illuminate\Http\Request;

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
    Route::get('areas/{id}/areaLoci', 'AreaController@areaLoci');
    Route::get('areas/loci', 'AreaController@loci');

    Route::get('customers', 'CustomersController@all');
    
    Route::get('customers/{id}', 'CustomersController@get');
    Route::post('customers/new', 'CustomersController@new');


    //private APIs

     //list loci
     Route::get('loci', 'LocusController@index');
     
     //show one locus
     Route::get('loci/{id}', 'LocusController@show');
     Route::get('loci/{id}/finds', 'LocusController@finds');
 
     //new locus
     Route::post('loci/store', 'LocusController@store');
 
     //update a locus
     Route::put('loci/store', 'LocusController@store');
     
     //delete a locus
     Route::delete('loci/{id}', 'LocusController@destroy');

     //Stones
     Route::get('stones', 'StoneController@index');
     Route::get('stones/{id}', 'StoneController@show');
     Route::post('stones/create', 'StoneController@store');
     Route::put('stones/{id}', 'StoneController@store');
     Route::delete('stones/{id}', 'StoneController@destroy');

     //Stones
     Route::get('groundstones', 'GroundstoneController@index');
     Route::get('groundstones/{id}', 'GroundstoneController@show');
     Route::post('groundstones/create', 'GroundstoneController@store');
     Route::put('groundstones/{id}', 'GroundstoneController@store');
     Route::delete('groundstones/{id}', 'GroundstoneController@destroy');

     //Materials
     Route::get('materials', 'MaterialController@index');

     //stoneTypes
     Route::get('stone-types', 'StoneTypeController@index');
     //Finds
     Route::get('finds', 'FindController@index');
     Route::get('finds/{id}/image', 'FindController@image');
     //scenes
     Route::get('scenes', 'SceneController@index');
     Route::get('scenes/{id}', 'SceneController@show');
     
     Route::post('scenes/create', 'SceneController@store');
     Route::post('files/store', 'FileController@store');
     Route::post('files/storeMultiple', 'FileController@storeMultiple');//formData
     Route::delete('files', 'FileController@destroy');

     
});

