<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'role_id' => 1,
                'name' => 'primarynet',
                'display_name' => 'primarynet',
                'description' => 'primarynet',
            ],
            [
                'role_id' => 2,
                'name' => 'company',
                'display_name' => 'company',
                'description' => 'company',
            ],
            [
                'role_id' => 3,
                'name' => 'guider',
                'display_name' => 'guider',
                'description' => 'guider',
            ],
            [
                'role_id' => 4,
                'name' => 'store',
                'display_name' => 'store',
                'description' => 'store',
            ]
        ]);

        DB::table('permission_role')->insert([
            // primarynet - role
            [
                'permission_id' => 1,
                'role_id' => 1,
            ],
            [
                'permission_id' => 2,
                'role_id' => 1,
            ],
            [
                'permission_id' => 3,
                'role_id' => 1,
            ],
            [
                'permission_id' => 4,
                'role_id' => 1,
            ],
            // primarynet - user
            [
                'permission_id' => 5,
                'role_id' => 1,
            ],
            [
                'permission_id' => 6,
                'role_id' => 1,
            ],
            [
                'permission_id' => 7,
                'role_id' => 1,
            ],
            [
                'permission_id' => 8,
                'role_id' => 1,
            ],
            // primarynet - company
            [
                'permission_id' => 17,
                'role_id' => 1,
            ],
            [
                'permission_id' => 18,
                'role_id' => 1,
            ],
            [
                'permission_id' => 19,
                'role_id' => 1,
            ],
            [
                'permission_id' => 20,
                'role_id' => 1,
            ],
            // company - role
            [
                'permission_id' => 1,
                'role_id' => 2,
            ],
            // company - user
            [
                'permission_id' => 5,
                'role_id' => 2,
            ],
            [
                'permission_id' => 6,
                'role_id' => 2,
            ],
            [
                'permission_id' => 7,
                'role_id' => 2,
            ],
            [
                'permission_id' => 8,
                'role_id' => 2,
            ],
            // company - guider
            [
                'permission_id' => 21,
                'role_id' => 2,
            ],
            [
                'permission_id' => 22,
                'role_id' => 2,
            ],
            [
                'permission_id' => 23,
                'role_id' => 2,
            ],
            [
                'permission_id' => 24,
                'role_id' => 2,
            ],
            // company - store
            [
                'permission_id' => 25,
                'role_id' => 2,
            ],
            [
                'permission_id' => 26,
                'role_id' => 2,
            ],
            [
                'permission_id' => 27,
                'role_id' => 2,
            ],
            [
                'permission_id' => 28,
                'role_id' => 2,
            ],
        ]);
    }
}
