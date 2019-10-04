<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferProduct extends Model
{
    protected $fillable = ['product_id', 'offer_id'];

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function offer()
    {
        return $this->belongsTo('App\Models\Offer');
    }

    public static function add($fields)
    {
        $offerProduct = new static;
        $offerProduct->fill($fields);
        $offerProduct->save();

        return $offerProduct;
    }

    public function edit($fields)
    {
        $this->fill($fields);
        $this->save();
    }

    public function delete()
    {
        //todo deletion products. check db
        $this->delete();
    }
}
