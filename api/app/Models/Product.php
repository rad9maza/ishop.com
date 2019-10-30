<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'category_id', 'image', 'price'];

    public function offers()
    {
        return $this->belongsToMany('App\Models\Offer', 'offer_product', 'product_id', 'offer_id')
            ->withPivot('count');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }
}
