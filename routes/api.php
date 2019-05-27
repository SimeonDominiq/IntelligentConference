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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', 'Auth\RegisterController@signUp');
Route::post('/login', 'Auth\LoginController@login');

/*Forgot Passwords*/
Route::post('/send-token', 'PasswordResetController@sendResetLink');
Route::get('confirm-token', 'PasswordResetController@confirmToken');// To check if token is valid
Route::post('password/reset','PasswordResetController@resetPassword');
/*end forgot password*/

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/logout', 'Auth\LoginController@logout');
    
    Route::get('/get-all-conferences', 'ConferenceController@getConferences');
    Route::get('/conference-details/{id}', 'ConferenceController@getConferenceDetails');
    Route::get('/get-users', 'RootController@getUsers');
    Route::get('/delete-talk/{conference_id}/{id}', 'ConferenceController@deleteTalk');

    Route::post('/add-conference', 'ConferenceController@addConference');
    Route::post('/addtalk', 'ConferenceController@addTalk');
});
