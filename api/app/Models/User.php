<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    protected $fillable = [
        'name',
        'email',
        'password',
        'provider',
        'provider_id'
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function offers()
    {
        return $this->hasMany('App\Models\Offer');
    }

    public function linkedSocialAccounts()
    {
        return $this->hasMany(LinkedSocialAccount::class);
    }
}
