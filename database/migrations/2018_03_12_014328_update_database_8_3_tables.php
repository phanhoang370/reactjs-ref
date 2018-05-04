<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDatabase83Tables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // update city table
        Schema::table('cities', function (Blueprint $table) {
            $table->renameColumn('name', 'city_name');
            $table->string('city_ko_name')->nullable();
            $table->string('city_en_name')->nullable();
            $table->string('city_vn_name')->nullable();
        });

        // create table country
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('country_id');
            $table->string('country_name');
            $table->string('city_ko_name')->nullable();
            $table->string('city_en_name')->nullable();
            $table->string('city_vn_name')->nullable();
            $table->timestamps();
        });

        // update companies table
        Schema::table('companies', function (Blueprint $table) {
            $table->renameColumn('name', 'company_name');
            $table->integer('country_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->renameColumn('address', 'company_address');
            $table->string('compnay_tel')->nullable();
            $table->string('compnay_owner')->nullable();
            $table->float('guid_fee_rate', 4 ,2)->nullable();
        });

        // create table info_guider_fee_rate
        Schema::create('info_guider_fee_rate', function (Blueprint $table) {
            $table->integer('company_id')->unsigned();
            $table->smallInteger('seller_level')->unsigned();
            $table->smallInteger('guid_level')->unsigned();
            $table->float('guid_rate', 4 ,2)->nullable();
            $table->timestamps();
        });
        
        // update guiders table
        Schema::table('guiders', function (Blueprint $table) {
            $table->renameColumn('guider_id', 'guid_id');
            $table->string('name', 100)->change();
            $table->renameColumn('name', 'guid_name');
            $table->string('phone', 100)->change();
            $table->renameColumn('phone', 'guid_phone');
            $table->string('guid_email', 100)->nullable();
            $table->string('level', 100)->nullable()->change();
            $table->renameColumn('level', 'guid_resident_number');
            $table->integer('manager_guid_id')->unsigned();
            $table->smallInteger('guid_level')->unsigned()->comment('Update from SP');
            $table->smallInteger('guid_status')->unsigned()->comment('0-Act, 1-unAct');
        });
        
        // update stores table
        Schema::table('stores', function (Blueprint $table) {
            $table->renameColumn('name', 'store_name');
            $table->renameColumn('phone', 'store_phone');
            $table->renameColumn('address', 'store_address');
            $table->integer('country_id')->unsigned();
            $table->double('GPSX', 12, 8)->default(0)->comment('경도');
            $table->double('GPSY', 12, 8)->default(0)->comment('위도');
            $table->float('dc_rate', 4, 2)->nullable();
            $table->float('company_fee_rate', 4, 2)->nullable();
        });
        
        // update bills table
        Schema::table('bills', function (Blueprint $table) {
            $table->timestamp('bill_date')->useCurrent();
            $table->decimal('bill_tot_cost', 15, 2)->nullable();
            $table->float('dc_rate', 4, 2)->nullable();
            $table->decimal('cost', 15, 2)->nullable()->comment('bill_cost = bill_tot_cost * (1.0-dc_rate)')->change();
            $table->renameColumn('cost', 'bill_cost');
            $table->dropColumn('discount');
        });

        // create table link_qr_company
        Schema::create('link_qr_company', function (Blueprint $table) {
            $table->increments('link_qr_id');
            $table->string('qr_code', 100);
            $table->integer('city_id')->unsigned();
            $table->integer('company_id')->unsigned();
            $table->integer('guid_id')->unsigned();
            $table->timestamp('link_from_date')->nullable();
            $table->timestamp('link_to_date')->nullable();
            $table->text('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.  
     *
     * @return void
     */
    public function down()
    {
        // update city table
        Schema::table('cities', function (Blueprint $table) {
            $table->renameColumn('city_name', 'name');
            $table->dropColumn('city_ko_name');
            $table->dropColumn('city_en_name');
            $table->dropColumn('city_vn_name');
        });

        Schema::dropIfExists('countries');

        Schema::dropIfExists('info_guider_fee_rate');

        Schema::table('companies', function (Blueprint $table) {
            $table->renameColumn('company_name', 'name');
            $table->dropColumn('country_id');
            $table->dropColumn('city_id');
            $table->renameColumn('company_address', 'address');
            $table->dropColumn('compnay_tel');
            $table->dropColumn('compnay_owner');
            $table->dropColumn('guid_fee_rate');
        });

        Schema::dropIfExists('info_guider_fee_rate');

        DB::statement("ALTER TABLE guiders CHANGE COLUMN guid_resident_number guid_resident_number TINYINT NOT NULL");
        
        Schema::table('guiders', function (Blueprint $table) {
            $table->renameColumn('guid_id', 'guider_id');
            $table->string('guid_name')->change();
            $table->renameColumn('guid_name', 'name');
            $table->string('guid_phone')->change();
            $table->renameColumn('guid_phone', 'phone');
            $table->dropColumn('guid_email');
            $table->renameColumn('guid_resident_number', 'level');
            $table->dropColumn('manager_guid_id');
            $table->dropColumn('guid_level');
            $table->dropColumn('guid_status');
        });

        Schema::table('stores', function (Blueprint $table) {
            $table->renameColumn('store_name', 'name');
            $table->renameColumn('store_phone', 'phone');
            $table->renameColumn('store_address', 'address');
            $table->dropColumn('country_id');
            $table->dropColumn('GPSX');
            $table->dropColumn('GPSY');
            $table->dropColumn('dc_rate');
            $table->dropColumn('company_fee_rate');
        });

        Schema::table('bills', function (Blueprint $table) {
            $table->dropColumn('bill_date');
            $table->dropColumn('bill_tot_cost');
            $table->dropColumn('dc_rate');
            $table->string('bill_cost')->change();
            $table->renameColumn('bill_cost', 'cost');
            $table->unsignedTinyInteger('discount');
        });

        Schema::dropIfExists('link_qr_company');
    }
}
