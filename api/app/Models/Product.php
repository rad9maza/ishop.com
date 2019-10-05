<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'category_id'];

    public function offers()
    {
        return $this->belongsToMany('App\Models\Offer', 'offer_product', 'product_id', 'offer_id');
    }

    public function offerProducts()
    {
        return $this->hasMany('App\Models\OfferProduct');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }
}
