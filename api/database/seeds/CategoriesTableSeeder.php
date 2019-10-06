<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
        }
    }
}
