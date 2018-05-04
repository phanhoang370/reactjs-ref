<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDb193Tables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->dropColumn('dc_rate');
            $table->dropColumn('company_fee_rate');
        });

        Schema::table('percents', function (Blueprint $table) {
            $table->dropColumn('percent_id');
            $table->dropColumn('cost');
            $table->dropColumn('discount');
            $table->integer('link_store_id')->unsigned();
            $table->double('dc_rate', 4, 2)->nullable();
            $table->double('company_fee_rate', 4, 2)->nullable();
            $table->primary('link_store_id');
        });

        Schema::rename('percents', 'link_company_store');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->float('dc_rate', 4, 2)->nullable();
            $table->float('company_fee_rate', 4, 2)->nullable();
        });

        Schema::table('link_company_store', function (Blueprint $table) {
            $table->dropPrimary('link_store_id');
            $table->dropColumn('link_store_id');
            $table->dropColumn('dc_rate');
            $table->dropColumn('company_fee_rate');
            $table->integer('discount');
            $table->integer('cost');
        });

        Schema::table('link_company_store', function (Blueprint $table) {
            $table->increments('percent_id');
        });

        Schema::rename('link_company_store', 'percents');
    }
}
