<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 5; $i++) {
            DB::table('categories')->insert([
                'name' => Str::random(10),
                'description' => Str::random(10),
            ]);
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
//        $this->call(CategoriesTableSeeder::class);
//        $this->call(ProductsTableSeeder::class);
    }
}
