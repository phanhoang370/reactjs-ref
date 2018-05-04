<?php

use Illuminate\Database\Seeder;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('cities')->insert([
            'city_name' => 'Seoun',
            'city_ko_name' => 'Seoun',
            'city_vn_name' => 'Seoun',
            'city_en_name' => 'Seoun'

        ]);

        DB::table('countries')->insert([
            'country_name' => 'Korea',
            'city_ko_name' => 'Seoun',
            'city_vn_name' => 'Seoun',
            'city_en_name' => 'Seoun'

        ]);
    }
}
