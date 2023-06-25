<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\CrewingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\NotificationController;

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
// Route::post('clientusers', function (Request $request) {
//     return $request->input('a');
// });
// Route::post('/clientusers', [ClientAuthController::class,'register']);
// Route::group(['prefix' => 'client'], function () {
//     Route::post('/login', [ClientAuthController::class, 'login']);
//     Route::group(["middleware" => 'auth:sanctum'], function () {
//         Route::post('/bresh', [ClientAuthController::class, "bresh"]);
//         Route::get('/me', [DataController::class, "me"]);
//         Route::post('/resetpass', [ClientAuthController::class, "resetpass"]);
//         Route::get('/logout', [DataController::class, "logout"]);
//         Route::post('/create', [DataController::class, "create"]);
//         Route::post('/createfile', [DataController::class, "createfile"]);
//         Route::post('/createself', [DataController::class, "createself"]);
//         Route::post('/createsleep', [DataController::class, "createsleep"]);
//         Route::post('/isregister', [DataController::class, "isregister"]);
//         Route::get('/loaddata', [DataController::class, "loaddata"]);
//         Route::post('/update', [DataController::class, "update"]);
//         Route::post('/updatemeal', [DataController::class, "updatemeal"]);
//         Route::post('/notification', [NotificationController::class, "notification"]);
//         Route::get('/onlynotification', [NotificationController::class, "onlynotification"]);
//         Route::post('/createbreshtime', [NotificationController::class, "createbreshtime"]);
//         Route::get('/loadbreshtime', [NotificationController::class, "loadbreshtime"]);
//         Route::post('/updatebreshtime', [NotificationController::class, "updatebreshtime"]);
//         Route::get('/deletebreshtime', [NotificationController::class, "deletebreshtime"]);
//         Route::post('/invited', [NotificationController::class, "invited"]);
//     });
// });

// Route::group(['prefix' => 'admin'], function () {
//     Route::post('/register', [ClientAuthController::class, 'register']);
//     Route::post('/login', [AdminAuthController::class, 'login']);
//     Route::group(["middleware" => 'auth:sanctum'], function () {
//         Route::get('/loadusers', [ClientAuthController::class, 'loadusers']);
//         Route::post('/searchusers', [ClientAuthController::class, 'searchusers']);
//         Route::post('/registerclient', [ClientAuthController::class, 'register']);
//         Route::post('/clientresetname', [ClientAuthController::class, 'clientresetname']);
//         Route::post('/clientresetpass', [ClientAuthController::class, 'clientresetpass']);
//         Route::post('/clientresetInfo', [ClientAuthController::class, 'clientresetInfo']);
//         Route::post('/resettreat', [ClientAuthController::class, 'resettreat']);
//         Route::get('/getuserdata', [DataController::class, "getuserdata"]);
//         Route::get('/loadvideo', [VideoController::class, "loadvideo"]);
//     });
// });

Route::post('/user/register', [ClientAuthController::class, 'register']);
Route::post('/user/login', [ClientAuthController::class, 'login']);
Route::post('/crewing/create', [CrewingController::class, 'create']);
Route::get('/crewing/getCrewing', [CrewingController::class, 'getCrewing']);
Route::put('/crewing/filled/{id}', [CrewingController::class, 'filled']);
Route::put('/crewing/comment/{id}', [CrewingController::class, 'comment']);
Route::put('/crewing/fixcomment/{id}', [CrewingController::class, 'fixcomment']);
Route::post('/crewing/deletecomment/{id}', [CrewingController::class, 'deletecomment']);
Route::get('/category/getCategories', [CreateController::class, 'getCategories']);