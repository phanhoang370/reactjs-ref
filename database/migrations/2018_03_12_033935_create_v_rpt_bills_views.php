<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVRptBillsViews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('
            CREATE VIEW v_rpt_bills AS 
                SELECT bill_date, bill_id, s.store_id, store_name, 
                       l.company_id, company_name, 
                       l.guid_id,
                       g.guid_name
                       bill_tot_cost, b.dc_rate, bill_cost, 
                       bill_tot_cost * (1.0 - company_fee_rate) AS company_fee
                FROM  bills b
                INNER JOIN stores s ON b.store_id = s.store_id
                INNER JOIN link_qr_company l ON b.qr_code = l.qr_code AND s.city_id = l.city_id AND link_from_date <= bill_date AND bill_date <= link_to_date
                INNER JOIN companies c ON l.company_id = c.company_id
                INNER JOIN guiders g ON c.company_id = l.company_id
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement( 'DROP VIEW v_rpt_bills' );
    }
}
