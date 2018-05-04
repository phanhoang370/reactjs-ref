<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeManagerGuidIdInGuidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('manager_guid_id')->default(0)->change();
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
            $table->integer('manager_guid_id')->unsigned()->change();
        });
    }
}
