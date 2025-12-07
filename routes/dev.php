<?php

use App\Http\Controllers\XdevController;
use Illuminate\Support\Facades\Route;

// Local dev
Route::post('status', [XdevController::class, 'status']);
Route::post('test', [XdevController::class, 'test']);
Route::post('run', [XdevController::class, 'run']);
