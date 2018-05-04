<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkCompanyStore extends Model
{

    protected $table = 'link_company_store';

    protected $primaryKey = 'link_store_id';

    protected $fillable = [
        'store_id',
        'company_id',
        'dc_rate',
        'company_fee_rate',
    ];
}
