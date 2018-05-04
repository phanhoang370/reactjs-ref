<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'user_id' => 1,
                'name' => 'admin',
                'email' => 'admin@primarynet.com',
                'password' => bcrypt('admin123'),
                'is_verified' => 1,
                'company_id' => null,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                'parent_id' => null,
            ],
            [
                'user_id' => 2,
                'name' => 'company',
                'email' => 'company@company.com',
                'password' => bcrypt('admin123'),
                'is_verified' => 1,
                'company_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                'parent_id' => 1,
            ],
            [
                'user_id' => 3,
                'name' => 'guider',
                'email' => 'guider@guider.com',
                'password' => bcrypt('admin123'),
                'is_verified' => 1,
                'company_id' => null,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                'parent_id' => 2,
            ],
            [
                'user_id' => 4,
                'name' => 'stores',
                'email' => 'stores@stores.com',
                'password' => bcrypt('admin123'),
                'is_verified' => 1,
                'company_id' => null,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                'parent_id' => 2,
            ]
        ]);
        DB::table('role_user')->insert([
            [
                'user_id' => 1,
                'role_id' => 1,
            ],
            [
                'user_id' => 2,
                'role_id' => 2,
            ],
            [
                'user_id' => 3,
                'role_id' => 3,
            ],
            [
                'user_id' => 4,
                'role_id' => 4,
            ]
        ]);
    }
}

