<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDatabaseTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::beginTransaction();

        // update guiders table
        Schema::table('guiders', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
            $table->renameColumn('id', 'guider_id');
        });

        // update bills table
        Schema::table('bills', function (Blueprint $table) {
            $table->dropForeign(['guider_id']);
            $table->dropColumn('guider_id');
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
            $table->string('qr_code');
            $table->unsignedTinyInteger('discount');
            $table->renameColumn('id', 'bill_id');
        });

        // create table company_guider
        Schema::create('company_guider', function (Blueprint $table) {
            $table->increments('company_guider_id');
            $table->integer('guider_id')->unsigned();
            $table->integer('company_id')->unsigned();
            $table->integer('cost');
            $table->timestamps();
        });

        // create table city
        Schema::create('cities', function (Blueprint $table) {
            $table->increments('city_id');
            $table->string('name');
            $table->timestamps();
        });

        // create table bill detail
        Schema::create('bill_details', function (Blueprint $table) {
            $table->increments('bill_detail_id');
            $table->integer('guider_id')->unsigned();
            $table->integer('company_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->timestamps();
        });

        // update stores table
        Schema::table('stores', function (Blueprint $table) {
            $table->integer('city_id')->unsigned();
            $table->renameColumn('id', 'store_id');
            $table->timestamps();
        });

        // update table percents
        Schema::table('percents', function (Blueprint $table) {
            $table->dropForeign(['store_id']);
            $table->dropForeign(['company_id']);
            $table->renameColumn('number', 'cost');
            $table->integer('discount');
            $table->renameColumn('id', 'percent_id');
        });

        // update table companies
        Schema::table('companies', function (Blueprint $table) {
            $table->renameColumn('id', 'company_id');
        });

        // update table profits
        Schema::table('profits', function (Blueprint $table) {
            $table->renameColumn('id', 'profit_id');
        });

        // update table user_verifications
        Schema::table('user_verifications', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->renameColumn('id', 'user_verification_id');
        });

        // update table profits
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('id', 'user_id');
        });

        // update table profits
        Schema::table('roles', function (Blueprint $table) {
            $table->renameColumn('id', 'role_id');
        });

        // update table permissions
        Schema::table('permissions', function (Blueprint $table) {
            $table->renameColumn('id', 'permission_id');
        });

        // update table permissions
        Schema::table('permission_role', function (Blueprint $table) {
            $table->dropForeign(['permission_id']);
            $table->dropForeign(['role_id']);

            $table->foreign('permission_id')->references('permission_id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('role_id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        // update table role_user
        Schema::table('role_user', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['role_id']);

            $table->foreign('user_id')->references('user_id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('role_id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        DB::commit();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('guiders', function (Blueprint $table) {
            $table->integer('company_id')->unsigned();
            $table->renameColumn('guider_id', 'id');
        });

        Schema::table('bills', function (Blueprint $table) {
            $table->integer('company_id')->unsigned();
            $table->integer('guider_id')->unsigned();
            $table->dropColumn('qr_code');
            $table->dropColumn('discount');
            $table->renameColumn('bill_id', 'id');
        });

        Schema::dropIfExists("company_guider");
        Schema::dropIfExists("cities");
        Schema::dropIfExists("bill_details");

        Schema::table('stores', function (Blueprint $table) {
            $table->dropColumn('city_id');
            $table->renameColumn('store_id', 'id');
            $table->dropTimestamps();
        });

        Schema::table('percents', function (Blueprint $table) {
            $table->renameColumn('cost', 'number');
            $table->dropColumn(['discount']);
            $table->renameColumn('percent_id', 'id');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->renameColumn('company_id', 'id');
        });

        Schema::table('profits', function (Blueprint $table) {
            $table->renameColumn('profit_id', 'id');
        });

        Schema::table('user_verifications', function (Blueprint $table) {
            $table->renameColumn('user_verification_id', 'id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('user_id', 'id');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->renameColumn('role_id', 'id');
        });

        Schema::table('permissions', function (Blueprint $table) {
            $table->renameColumn('permission_id', 'id');
        });

        // update table permissions
        Schema::table('permission_role', function (Blueprint $table) {
            $table->dropForeign(['permission_id']);
            $table->dropForeign(['role_id']);

            $table->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
        });

        // update table role_user
        Schema::table('role_user', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['role_id']);

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');
        });
    }
}
