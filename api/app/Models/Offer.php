<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{

    public function products()
    {
        return $this->belongsToMany('App\Models\Product', 'offer_product', 'offer_id', 'product_id')
            ->withPivot('count');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

}
