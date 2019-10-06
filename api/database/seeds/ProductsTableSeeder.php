<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 5; $i++) {
            for ($j = 1; $j <= 5; $j++) {
                DB::table('products')->insert([
                    'name' => Str::random(10),
                    'description' => Str::random(10),
                    'category_id' => $i,
                    'image' => Str::random(10),
                    'price' => rand(),
                ]);
            }
        }
    }
}
