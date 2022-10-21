<?php

use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\PayPayController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
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

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [UserController::class, 'show'])->name("user.show");
    Route::put("/user", [UserController::class, 'update'])->name("user.update");
    Route::delete("/user", [UserController::class, 'destroy'])->name("user.destroy");
    Route::apiResource('tasks', TaskController::class);
    Route::put("/tasks/{task}/do", [TaskController::class, 'do'])->name("tasks.update.done");
    Route::put("/tasks/{task}/undo", [TaskController::class, 'undo'])->name("tasks.update.undo");
    Route::get("/task/ordered", [TaskController::class, 'orderedTasks'])->name("tasks.ordered");
    Route::apiResource('friends', FriendController::class);
    Route::get('/friends/search', [FriendController::class, 'search'])->name("friends.search");
    Route::get('/friend/users', [FriendController::class, 'friends'])->name("friends.users"); // friendsたと動作しない
    Route::get('/paypay', [PayPayController::class, 'createQRCode'])->name("paypay.qr.create");
    Route::get('/paypay/payment', [PayPayController::class, 'getPaymentDetails'])->name("paypay.payment");
});
Route::get('/reset-password/{token}', ResetPasswordController::class)
    ->name('password.reset');
