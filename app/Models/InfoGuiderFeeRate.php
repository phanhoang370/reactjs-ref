<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoGuiderFeeRate extends Model
{
    protected $table = 'info_guider_fee_rate';
    
    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        'company_id',
        'seller_level',
        'guid_level',
        'guid_rate',
    ];
}
