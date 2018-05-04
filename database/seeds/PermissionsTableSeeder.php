<?php

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            // role
            [
                'permission_id' => 1,
                'name' => 'role-view',
                'display_name' => 'Display Role Listing',
                'description' => 'See only Listing Of Role',
            ],
            [
                'permission_id' => 2,
                'name' => 'role-create',
                'display_name' => 'Create Role',
                'description' => 'Create New Role',
            ],
            [
                'permission_id' => 3,
                'name' => 'role-edit',
                'display_name' => 'Edit Role',
                'description' => 'Edit Role',
            ],
            [
                'permission_id' => 4,
                'name' => 'role-delete',
                'display_name' => 'Delete Role',
                'description' => 'Delete Role',
            ],
            // user
            [
                'permission_id' => 5,
                'name' => 'user-view',
                'display_name' => 'Display user Listing',
                'description' => 'See only Listing Of user',
            ],
            [
                'permission_id' => 6,
                'name' => 'user-create',
                'display_name' => 'Create user',
                'description' => 'Create New user',
            ],
            [
                'permission_id' => 7,
                'name' => 'user-edit',
                'display_name' => 'Edit user',
                'description' => 'Edit user',
            ],
            [
                'permission_id' => 8,
                'name' => 'user-delete',
                'display_name' => 'Delete user',
                'description' => 'Delete user',
            ],
            // bill
            [
                'permission_id' => 9,
                'name' => 'bill-view',
                'display_name' => 'Display bill Listing',
                'description' => 'See only Listing Of bill',
            ],
            [
                'permission_id' => 10,
                'name' => 'bill-create',
                'display_name' => 'Create bill',
                'description' => 'Create New bill',
            ],
            [
                'permission_id' => 11,
                'name' => 'bill-edit',
                'display_name' => 'Edit bill',
                'description' => 'Edit bill',
            ],
            [
                'permission_id' => 12,
                'name' => 'bill-delete',
                'display_name' => 'Delete bill',
                'description' => 'Delete bill',
            ],
            // location
            [
                'permission_id' => 13,
                'name' => 'location-view',
                'display_name' => 'Display location Listing',
                'description' => 'See only Listing Of location',
            ],
            [
                'permission_id' => 14,
                'name' => 'location-create',
                'display_name' => 'Create location',
                'description' => 'Create New location',
            ],
            [
                'permission_id' => 15,
                'name' => 'location-edit',
                'display_name' => 'Edit location',
                'description' => 'Edit location',
            ],
            [
                'permission_id' => 16,
                'name' => 'location-delete',
                'display_name' => 'Delete location',
                'description' => 'Delete location',
            ],
            // company
            [
                'permission_id' => 17,
                'name' => 'company-view',
                'display_name' => 'Display company Listing',
                'description' => 'See only Listing Of company',
            ],
            [
                'permission_id' => 18,
                'name' => 'company-create',
                'display_name' => 'Create company',
                'description' => 'Create New company',
            ],
            [
                'permission_id' => 19,
                'name' => 'company-edit',
                'display_name' => 'Edit company',
                'description' => 'Edit company',
            ],
            [
                'permission_id' => 20,
                'name' => 'company-delete',
                'display_name' => 'Delete company',
                'description' => 'Delete company',
            ],
            // guider
            [
                'permission_id' => 21,
                'name' => 'guider-view',
                'display_name' => 'Display guider Listing',
                'description' => 'See only Listing Of guider',
            ],
            [
                'permission_id' => 22,
                'name' => 'guider-create',
                'display_name' => 'Create guider',
                'description' => 'Create New guider',
            ],
            [
                'permission_id' => 23,
                'name' => 'guider-edit',
                'display_name' => 'Edit guider',
                'description' => 'Edit guider',
            ],
            [
                'permission_id' => 24,
                'name' => 'guider-delete',
                'display_name' => 'Delete guider',
                'description' => 'Delete guider',
            ],
            // store
            [
                'permission_id' => 25,
                'name' => 'store-view',
                'display_name' => 'Display store Listing',
                'description' => 'See only Listing Of store',
            ],
            [
                'permission_id' => 26,
                'name' => 'store-create',
                'display_name' => 'Create store',
                'description' => 'Create New store',
            ],
            [
                'permission_id' => 27,
                'name' => 'store-edit',
                'display_name' => 'Edit store',
                'description' => 'Edit store',
            ],
            [
                'permission_id' => 28,
                'name' => 'store-delete',
                'display_name' => 'Delete store',
                'description' => 'Delete store',
            ],
        ]);
    }
}
