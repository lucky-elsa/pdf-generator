<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\CrewingController;
use App\Http\Controllers\CrudContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientAuthController;

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

Route::post('/user/register', [ClientAuthController::class, 'register']);
Route::post('/user/login', [ClientAuthController::class, 'login']);
Route::post('/crewing/create', [CrewingController::class, 'create']);
Route::get('/crewing/getCrewing', [CrewingController::class, 'getCrewing']);
Route::put('/crewing/filled/{id}', [CrewingController::class, 'filled']);
Route::put('/crewing/comment/{id}', [CrewingController::class, 'comment']);
Route::put('/crewing/fixcomment/{id}', [CrewingController::class, 'fixcomment']);
Route::post('/crewing/deletecomment/{id}', [CrewingController::class, 'deletecomment']);
Route::get('/category/getCategories', [CreateController::class, 'getCategories']);
Route::post('/category/addcategory', [CreateController::class, 'addCategories']);

Route::get('/controller/getDocuments', [CrudContoller::class, 'getDocuments']);
Route::post('/controller/addDocument', [CrudContoller::class, 'addDocument']);
Route::delete('/controller/deleteDocument/{id}', [CrudContoller::class, 'deleteDocument']);

Route::get('/controller/getMarintime', [CrudContoller::class, 'getMarintime']);
Route::post('/controller/addMarintime', [CrudContoller::class, 'addMarintime']);
Route::delete('/controller/deleteMarintime/{id}', [CrudContoller::class, 'deleteMarintime']);