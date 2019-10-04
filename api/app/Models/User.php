<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['name', 'surname', 'email', 'password', 'address'];

    protected $hidden = ['password'];

    public function offers()
    {
        return $this->hasMany('App\Models\Offer');
    }

    public static function add($fields)
    {
        $user = new static;
        $user->fill($fields);
        $user->password = bcrypt($fields['password']);
        $user->save();

        return $user;
    }

    public function edit($fields)
    {
        $this->fill($fields);
        $this->password = bcrypt($fields['password']);
        $this->save();
    }

    public function delete()
    {
        //todo deletion products. check db
        $this->delete();
    }
}
