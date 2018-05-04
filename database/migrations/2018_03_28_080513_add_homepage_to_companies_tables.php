<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHomepageToCompaniesTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('home_page');
            $table->smallInteger('guide_level')->default(1);
            $table->renameColumn('company_owner', 'ceo_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('home_page');
            $table->dropColumn('guide_level');
            $table->renameColumn('ceo_name', 'company_owner');
        });
    }
}
