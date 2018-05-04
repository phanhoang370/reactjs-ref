<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContactToCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->string('contact_persion')->nullable();
            $table->string('contact_email')->nullable();
            $table->float('parent_commission_rate', 4, 2)->default(0,00);
            $table->integer('parent_company')->unsigned()->nullable();
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
            $table->dropColumn('contact_persion');
            $table->dropColumn('contact_email');
            $table->dropColumn('parent_commission_rate');
            $table->dropColumn('parent_company');
        });
    }
}
