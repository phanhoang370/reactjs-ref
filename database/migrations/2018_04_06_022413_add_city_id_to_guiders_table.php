<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCityIdToGuidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->string('guid_id', 11)->unique()->change();
            $table->integer('city_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM guiders");
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('guid_id')->unsigned()->change();
            $table->dropColumn('city_id');
        });
    }
}
