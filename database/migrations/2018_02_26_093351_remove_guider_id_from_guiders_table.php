<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveGuiderIdFromGuidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->dropForeign(['guider_id']);
            $table->dropColumn('guider_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('guider_id')->unsigned();
        });
    }
}
