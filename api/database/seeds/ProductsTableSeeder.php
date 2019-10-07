<?php

use App\Models\Category;
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
        $categories = Category::all()->pluck('id');
        echo $categories;
        $products = [];
        foreach ($categories as $category) {
            for ($j = 1; $j <= 5; $j++) {
                array_push($products, [
                    'name' => $faker->colorName,
                    'description' => $faker->realText($maxNbChars = 25, $indexSize = 2),
                    'category_id' => $category,
                    'image' => $faker->imageUrl($width = 640, $height = 480),
                    'price' => rand(),
                ]);
            }
        }

        DB::table('products')->insert($products);
    }
}
