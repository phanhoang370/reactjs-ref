<?php

use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types')->insert([
            [
                'type_id' => 1,
                'type_name' => 'Restaurant',
            ],
            [
                'type_id' => 2,
                'type_name' => 'Spa/Massage',
            ],
            [
                'type_id' => 3,
                'type_name' => 'Shopping',
            ],
            [
                'type_id' => 4,
                'type_name' => 'Café',
            ],
            [
                'type_id' => 5,
                'type_name' => 'Others',
            ],
        ]);
    }
}
