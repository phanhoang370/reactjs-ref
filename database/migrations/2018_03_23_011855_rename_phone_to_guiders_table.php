<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenamePhoneToGuidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            //
            $table->bigInteger('guid_phone')->change();
            $table->integer('company_id')->unsigned();
            $table->dropColumn('number');
        });
        Schema::dropIfExists('company_guider');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('guiders', function (Blueprint $table) {
            //
            $table->string('guid_phone')->change();
            $table->integer('number');
            $table->dropColumn('company_id');

        });
    }
}
