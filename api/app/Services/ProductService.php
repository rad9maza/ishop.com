<?php


namespace App\Services;


use App\Models\Product;
use Illuminate\Http\Request;

class ProductService
{
    public static function getPaginatedAndFilteredProducts(Request $request)
    {
        $queryProducts = Product::query();
        if ($request->get('category') != "") {
            $queryProducts->whereRaw('category_id = ?', $request->get("category"));
        }
        if ($request->get('search') != "") {
            $queryProducts->whereRaw('LOWER(`name`) LIKE ? ', trim(strtolower('%' . $request->get("search"))) . '%');
        }
        $result = $queryProducts->paginate($request->get("pageLength"));
        return [$result->items(), $result->total()];
    }
}
