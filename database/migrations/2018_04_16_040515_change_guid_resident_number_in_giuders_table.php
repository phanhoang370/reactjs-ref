<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeGuidResidentNumberInGiudersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->string('guid_resident_number', 20)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE guiders SET guid_resident_number=1");
        DB::statement("ALTER TABLE guiders CHANGE COLUMN guid_resident_number guid_resident_number TINYINT NOT NULL");
    }
}
