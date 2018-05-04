<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateLinkStoreIdInLinkCompanyStore extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('link_company_store', function (Blueprint $table) {
            $table->string('link_store_id', 11)->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM link_company_store");
        Schema::table('link_company_store', function (Blueprint $table) {
            $table->integer('link_store_id')->unsigned()->change();
        });
    }
}
