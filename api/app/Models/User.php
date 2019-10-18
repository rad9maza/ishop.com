<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'provider', 'provider_id' ];

    public function offers()
    {
        return $this->hasMany('App\Models\Offer');
    }
}
