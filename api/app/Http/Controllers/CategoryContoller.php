<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryContoller extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

}
