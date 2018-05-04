<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateViewReportTest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::statement('
            CREATE VIEW reports AS 
                SELECT bill_date, bill_id, s.store_id, store_name, 
                       l.company_id, company_name, 
                       l.guid_id,
                       g.guid_name,
                       bill_tot_cost, b.dc_rate, bill_cost, 
                       bill_tot_cost * (1.0 - 0.3) AS company_fee
                FROM  bills b
                INNER JOIN stores s ON b.store_id = s.store_id
                INNER JOIN link_qr_companies l ON b.qr_code = l.qr_code
                INNER JOIN companies c ON l.company_id = c.company_id
                INNER JOIN guiders g ON l.company_id = g.company_id
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement( 'DROP VIEW reports' );

    }
}
