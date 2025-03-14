<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\DigModuleController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureReadAccessibility;
use App\Http\Middleware\EnsureMutationAccessibility;

// Open routes
Route::get('app/init', [AppController::class, 'init']);

// Read only routes
Route::group(['middleware' => [EnsureReadAccessibility::class]], function () {
    Route::post('module/init', [DigModuleController::class, 'init']);
    Route::post('module/index', [DigModuleController::class, 'index']);
    Route::post('module/page', [DigModuleController::class, 'page']);
    Route::post('module/show', [DigModuleController::class, 'show']);
    Route::post('carousel/show', [CarouselController::class, 'show']);
});

// Mutators. Additional specific authorization is done at request forms.
Route::group(['middleware' => ['auth:sanctum', 'verified', EnsureMutationAccessibility::class]], function () {
    Route::post('module/store', [DigModuleController::class, 'store']);
    Route::put('module/store', [DigModuleController::class, 'store']);
    Route::post('module/destroy', [DigModuleController::class, 'destroy']);
    Route::post('tags/sync', [TagController::class, 'sync']);
    Route::post('media/upload', [MediaController::class, 'upload']);
    Route::post('media/destroy', [MediaController::class, 'destroy']);
    Route::post('media/edit', [MediaController::class, 'edit']);
    Route::post('media/reorder', [MediaController::class, 'reorder']);
});

// User info
Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
    Route::get('about/me', [AuthController::class, 'me']);
});
