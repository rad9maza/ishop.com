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

Route::get('/products', 'ProductContoller@index');
Route::get('/products/create', 'ProductContoller@create');
Route::post('/products', 'ProductContoller@store');
Route::get('/products/{id}', 'ProductContoller@show');
Route::get('/products/{id}/edit', 'ProductContoller@edit');
Route::put('/products/{id}', 'ProductContoller@update');
Route::delete('/products/{id}', 'ProductContoller@destroy');
