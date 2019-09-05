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
    Route::get('areas/areas0', 'AreaController@areas0');
    Route::get('areas/{id}/lociListForArea', 'AreaController@lociListForArea');
    Route::get('areas/{id}/max-locus', 'AreaController@maxLocusNo');
    Route::get('areas/areasWithLoci', 'AreaController@areasWithLoci');

    Route::get('customers', 'CustomersController@all');
    
    Route::get('customers/{id}', 'CustomersController@get');
    Route::post('customers/new', 'CustomersController@new');


    //private APIs

     //list loci
     Route::get('loci', 'LocusController@index');
     
     //show one locus
     Route::get('loci/{id}', 'LocusController@show');
     Route::get('loci/{id}/findList', 'LocusController@findList');
 
     //new locus
     Route::post('loci/create', 'LocusController@store');
 
     //update a locus
     Route::put('loci/create', 'LocusController@store');
     
     //delete a locus
     Route::delete('loci/{id}', 'LocusController@destroy');

     //Stones
     Route::get('stones', 'StoneController@index');
     Route::get('stones/{id}', 'StoneController@show');
     Route::post('stones/create', 'StoneController@store');
     Route::put('stones/{id}', 'StoneController@store');
     Route::delete('stones/{id}', 'StoneController@destroy');

     //Groundtones
     Route::get('groundstones', 'GroundstoneController@index');
     Route::get('groundstones/{id}', 'GroundstoneController@show');
     Route::post('groundstones/create', 'GroundstoneController@store');
     Route::put('groundstones/{id}', 'GroundstoneController@store');
     Route::delete('groundstones/{id}', 'GroundstoneController@destroy');

     //Materials
     Route::get('materials', 'MaterialController@index');

     //GroundstoneTypes
     Route::get('groundstone-types', 'GroundstoneTypeController@index');

     //Finds
     Route::get('finds', 'FindController@index');

     
});

