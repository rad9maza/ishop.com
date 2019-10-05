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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/products', 'ProductContoller@index'); //список
Route::get('/products/{id}', 'ProductContoller@show'); //один
Route::post('/products', 'ProductContoller@store'); //создание
Route::put('/products/{id}', 'ProductContoller@update'); //обновить
Route::delete('/products/{id}', 'ProductContoller@destroy'); //удалить

Route::get('/categories', 'CategiryController@index'); //список
Route::get('/categories/{id}', 'CategiryController@show'); //один
