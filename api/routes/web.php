<?php

use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/socialite/{provider}', 'AuthController@redirect');
Route::get('/socialite/{provider}/callback', 'AuthController@callback');

Route::get('/products', 'ProductController@index'); //список
Route::get('/products/{id}', 'ProductController@show'); //один
Route::post('/products', 'ProductController@store'); //создание
Route::put('/products/{id}', 'ProductController@update'); //обновить
Route::delete('/products/{id}', 'ProductController@destroy'); //удалить

Route::get('/categories', 'CategoryController@index'); //список
Route::get('/categories/{id}', 'CategoryController@show')->middleware('auth'); //один

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

