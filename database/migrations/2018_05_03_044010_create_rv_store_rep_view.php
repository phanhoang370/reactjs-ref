<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRvStoreRepView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
//        DB::statement('
//            CREATE OR REPLACE VIEW rv_store_rep AS
//            SELECT `a`.`bill_ymd` AS `bill_ymd`,
//                   `d`.`guid_name` AS `guid_name`,
//                   `a`.`store_id` AS `store_id`,`
//                   a`.`company_id` AS `company_id`,
//                   `b`.`company_name` AS `company_name`,
//                   sum(`a`.`bill_tot_cost`) AS `bill_tot_cost`,
//                   sum(`a`.`com_fee_cost`) AS `com_fee_cost`
//            FROM ((`rep_bills_ymd` `a`
//            join `companies` `b` on((`a`.`company_id` = `b`.`company_id`)))
//            join `guiders` `d` on((`a`.`guid_id` = `d`.`guid_id`)))
//            group by `a`.`bill_ymd`,`d`.`guid_name`,`a`.`store_id`,`a`.`company_id`,`b`.`company_name`
//        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
