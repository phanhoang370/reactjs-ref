<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'parent_id' => 1,
    ];
});

$factory->define(App\Models\Store::class, function (Faker\Generator $faker) {

    return [
        'store_name' => $faker->name,
        'store_phone' => $faker->phoneNumber,
        'store_address' => $faker->address,
        'city_id' => 1,
        'country_id' => 1,
        'GPSX' => $faker->latitude($min = -90, $max = 90),
        'GPSY' => $faker->longitude($min = -180, $max = 180),
        'home_page' => 'home_page',
        'description' => 'description',
        'type_id' => $faker->numberBetween(1,5),
    ];
});

$factory->define(App\Models\Guider::class, function (Faker\Generator $faker) {

    return [
        'guid_id' => $faker->unique()->numberBetween(1,21243243),
        'guid_name' => $faker->name,
        'guid_phone' => $faker->numberBetween(111,1111),
        'guid_resident_number' => 1,
        'manager_guid_id' => 1,
        'guid_level' => 1,
        'guid_status' => 1,
        'user_id' => null,
        'company_id' => $faker->numberBetween(1,5),
        'city_id' => 1,
    ];
});

$factory->define(App\Models\Company::class, function (Faker\Generator $faker) {

    return [
        'company_name' => $faker->company,
        'company_address' => $faker->address,
        'country_id' => 1,
        'company_tel' => $faker->phoneNumber,
        'city_id' => 1,
        'ceo_name' => $faker->name,
        'guid_fee_rate' => 1,
        'home_page' => $faker->domainName,
        'guide_level' => $faker->numberBetween(1,5),
        'commission_rate' => 1,
    ];
});

$factory->define(App\Models\Bill::class, function (Faker\Generator $faker) {

    return [
        'store_id' => $faker->numberBetween(1,3),
        'bill_cost' => $faker->numberBetween(200000,2000000),
        'content' => $faker->text,
        'qr_code' => $faker->unique()->numberBetween(200,2000),
        'bill_date' => $faker->dateTimeThisYear($max = 'now', $timezone = null) ,
        'bill_tot_cost' => $faker->numberBetween(2000000,20000000),
        'dc_rate' => $faker->numberBetween(20,50)
    ];
});

$factory->define(App\Models\LinkQrCompany::class, function (Faker\Generator $faker) {

    return [
        'city_id' => 1,
        'company_id' =>$faker->numberBetween(1,3),
        'guid_id' => 1,
        'content' => $faker->text,
        'link_from_date' => $faker->dateTime($max = 'now', $timezone = null),
        'link_to_date' => $faker->dateTime($max = 'now', $timezone = null),
    ];
});

$factory->define(App\Models\LinkCompanyStore::class, function (Faker\Generator $faker) {

    return [
        'store_id' => $faker->unique()->numberBetween(2, 8),
        'company_id' => $faker->numberBetween(1, 8),
        'link_store_id' => $faker->unique()->numberBetween(1,39999),
        'dc_rate' => 1,
        'company_fee_rate' => 1,
        'user_id' => null,
    ];
});
