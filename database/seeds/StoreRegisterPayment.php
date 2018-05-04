<?php

use Illuminate\Database\Seeder;

class StoreRegisterPayment extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        DB::table('companies')->insert([
            'company_name' => 'company',
            'company_address' => 'aaa',
            'country_id' => 1,
            'company_tel' => '0123456789',
            'city_id' => 1,
            'ceo_name' => 'seo name',
            'guid_fee_rate' => 1,
            'home_page' => 'homepage.com',
            'guide_level' => 5,
            'commission_rate' => 1,
        ]);

        DB::table('guiders')->insert([
            'guid_id' => '1',
            'guid_name' => 'guider',
            'guid_phone' => '0123654789',
            'guid_resident_number' => 1,
            'manager_guid_id' => 1,
            'guid_level' => 1,
            'guid_status' => 1,
            'user_id' => 3,
            'company_id' => 1,
            'city_id' => 1,
        ]);

        DB::table('stores')->insert([
            [
                'store_name' => 'Namaka jewelry',
                'store_phone' => '0132569874',
                'store_address' => '1548 Anabelle Meadows
Gwendolynbury, MD 19145-4977',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price',
                'type_id' => 1,
            ],
            [
                'store_name' => 'Namaka join',
                'store_phone' => '0132569874',
                'store_address' => 'Vietnam',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price',
                'type_id' => 2,
            ],
            [
                'store_name' => 'jery',
                'store_phone' => '0132569874',
                'store_address' => '1862 Dickens Mission
Schoenbury, RI 22713-2438',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price',
                'type_id' => 3,
            ],
            [
                'store_name' => 'Tom',
                'store_phone' => '0132569874',
                'store_address' => '616 Koepp Circle Suite 737
Paucekmouth, ME 26211',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price ',
                'type_id' => 4,
            ],
            [
                'store_name' => 'Tomy',
                'store_phone' => '0132569874',
                'store_address' => '121 Johnathon Valleys
Port Venamouth, NY 90840',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price ',
                'type_id' => 5,
            ],
            [
                'store_name' => 'tony',
                'store_phone' => '0132569874',
                'store_address' => '1548 Anabelle Meadows
Gwendolynbury, MD 19145-4977',
                'city_id' => 1,
                'country_id' => 1,
                'GPSX' => 1,
                'GPSY' => 1,
                'home_page' => 'home_page',
                'description' => 'he best shop in danang with cheap price ',
                'type_id' => 6,
            ]
        ]);
        //create bill
        factory(App\Models\User::class, 15)->create();
        factory(App\Models\Company::class, 10)->create();
        factory(App\Models\Guider::class, 10)->create();
//        factory(App\Models\Store::class, 10)->create();
        factory(App\Models\Bill::class, 4)->create()->each(function ($u) {
            $u->linkqrcompany()->save(factory(App\Models\LinkQrCompany::class)->make());
        });
        factory(App\Models\LinkCompanyStore::class, 4)->create();

        DB::table('link_company_store')->insert([
            'store_id' => 1,
            'company_id' => 1,
            'user_id' => 4,
            'dc_rate' => 10,
            'company_fee_rate' => 10,
            'link_store_id' => 10,
        ]);

    }
}
