<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = ['name', 'user_id'];

    public function products()
    {
        return $this->belongsToMany('App\Models\Product', 'offer_product', 'offer_id', 'product_id');
    }

    public function offerProducts()
    {
        return $this->hasMany('App\Models\OfferProduct');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function offers()
    {
        return $this->hasMany('App\Models\Offer');
    }

    public static function add($fields)
    {
        $offer = new static;
        $offer->fill($fields);
        $offer->save();

        return $offer;
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
