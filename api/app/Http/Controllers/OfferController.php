<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->json()->all();
        $productIdsInCart = $data['productIdsInCart'];

        return DB::transaction(function ($productIdsInCart) {

            $offer = new Offer;
            $offer->payments = true;
            $offer->user()->associate(auth()->guard('api')->user());
            $offer->save();
            foreach ($productIdsInCart as $orderItem) {
                $offer->products()->attach($orderItem['id'], ['count' => $orderItem['count'], 'offer_id' => $offer->id]);
            }
            return $offer;
        }, 5);
    }
}
