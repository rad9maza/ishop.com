<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->json()->all();
        $offer = new Offer;
        $offer->payments = true;
        $offer->user()->associate(auth()->guard('api')->user());
        $offer->save();

        foreach ($data['productIdsInCart'] as $orderItem) {
            $offer->products()->attach($orderItem['id'], ['count' => $orderItem['count'], 'offer_id' => $offer->id]);
        }

        return $offer;
    }
}
