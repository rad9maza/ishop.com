<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        if ($request->has('ids')) {
            $ids = json_decode($request->ids[0], true);
            return Product::findMany($ids);
        }
        return ProductService::getPaginatedAndFilteredProducts($request);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());

        return $product;
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return $product;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response('', 204);
    }
}
