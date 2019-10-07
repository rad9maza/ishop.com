<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i = 1; $i <= 5; $i++) {
            for ($j = 1; $j <= 5; $j++) {
                DB::table('products')->insert([
                    'name' => $faker->colorName,
                    'description' => $faker->realText($maxNbChars = 25, $indexSize = 2),
                    'category_id' => $i,
                    'image' => $faker->imageUrl($width = 640, $height = 480),
                    'price' => rand(),
                ]);
            }
        }
    }
}
