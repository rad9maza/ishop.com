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

    public static function add($fields)
    {
        $category = new static;
        $category->fill($fields);
        $category->save();

        return $category;
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

    public function setCategory($id)
    {
        if ($id == null) {
            return;
        }

        $this->category_id = $id;
        $this->save();
    }

    //todo image uploading
//    public function uploadImage($image)
//    {
//        if($image == null) {return;}
//
//        Storage::delete('uploads/'.$this->$image);
//        $filename = str_random(10).'.'.$image->extention();
//        $image->saveAs('uploads', $filename);
//        $this->image = $filename;
//        $this->save();
//    }
}
