<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkQrCompany extends Model
{
    protected $primaryKey = 'link_qr_id';

    protected $fillable = [
        'qr_code',
        'city_id',
        'company_id',
        'guid_id',
        'link_from_date',
        'link_to_date',
        'content',
    ];

    public function bills(){
        return $this->belongsTo(Bill::class, 'qr_code');
    }

    public function city(){
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function guider(){
        return $this->belongsTo(Guider::class, 'guid_id', 'guid_id');
    }

    public function company(){
        return $this->belongsTo(Company::class, 'company_id', 'company_id');
    }
}
