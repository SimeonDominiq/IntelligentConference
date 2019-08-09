<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function() {
    dd("HomePage");
});
Route::get('/hello', function() {
    dd("Hello");
});

Route::get('/{path}', function () {
    return view('app');
})->where('path', '(?!api).*');

// Route::get('/{path}', function () {
//     return view('app');
// })->where('path', '(?!api).*');
//->where('path', '(?!api)([A-z\d-\/_.]+)?');
// Route::get('/{path}', function () {
//     return view('app');
// })->where('path', '.*');