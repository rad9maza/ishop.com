<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CategoriesTableSeeder extends Seeder
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
            DB::table('categories')->insert([
                'name' => $faker->name,
                'description' => $faker->realText($maxNbChars = 15, $indexSize = 2),
            ]);
        }
    }
}
