<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOfferProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offer_product', function (Blueprint $table) {
            $table->bigIncrements('offer_id')->unsigned();
            $table->string('product_id')->unsigned();
            $table->integer('count');
            $table->timestamps();
            $table->primary(['offer_id', 'product_id']);
            $table->foreign('offer_id')->references('id')->on('offers')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('offer_product');
    }
}
