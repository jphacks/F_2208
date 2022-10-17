<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/index', [TaskController::class, 'index']);
Route::post('/store', [TaskController::class, 'store']);
Route::post('/show', [TaskController::class, 'show']);
Route::post('/update', [TaskController::class, 'update']);
Route::post('/destroy', [TaskController::class, 'destroy']);