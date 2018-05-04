<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDb244Tables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('user_id')->nullable()->change();
            $table->dropColumn('guid_email');
        });
        Schema::table('stores', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
        Schema::table('link_company_store', function (Blueprint $table) {
            $table->integer('user_id')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM guiders WHERE user_id = null");
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('user_id')->unsigned()->nullable()->change();
            $table->string('guid_email', 100);
        });
        Schema::table('stores', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
        });
        Schema::table('link_company_store', function (Blueprint $table) {
            $table->dropColumn('user_id');
        });
    }
}
