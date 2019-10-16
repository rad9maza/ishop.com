<?php

use Illuminate\Http\Request;
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

Route::get('/products', 'ProductController@index'); //список
Route::get('/products/{id}', 'ProductController@show'); //один
Route::post('/products', 'ProductController@store'); //создание
Route::put('/products/{id}', 'ProductController@update'); //обновить
Route::delete('/products/{id}', 'ProductController@destroy'); //удалить

Route::get('/categories', 'CategoryController@index'); //список
Route::get('/categories/{id}', 'CategoryController@show'); //один
