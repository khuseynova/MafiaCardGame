<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RoomController;
use App\Http\Middleware\CheckGuest;
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

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getLoggedInUser']);
    Route::post('/room/create',[RoomController::class,'store']);
    Route::delete('/room/{id}',[RoomController::class,'destroy']);
    Route::get('/user/room/show',[RoomController::class,'showAll']);
    Route::get('/user/room/show/{id}/{pin}', [RoomController::class,'getById']);
});

Route::middleware([CheckGuest::class])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::delete('/guest/{id}',[GuestController::class,'destroy']);
});

Route::post('/guest', [GuestController::class, 'store']);
Route::get('/guest/room/show',[RoomController::class,'showAll']);
Route::get('/guest/room/show/{id}', [RoomController::class,'getById']);
Route::get('/guest/token', [GuestController::class,'getGuestByToken']);
Route::post('/message', [MessageController::class,'store']);
Route::get('/message/{id}', [MessageController::class,'showAll']);
