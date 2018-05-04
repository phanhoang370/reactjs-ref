<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $primaryKey = 'bill_id';

    protected $fillable = [
        'store_id',
        'bill_cost',
        'bill_date',
        'content',
        'qr_code',
        'bill_tot_cost',
        'dc_rate',
    ];

    public function profits()
    {
        return $this->hasMany(Profit::class);
    }

    public function linkqrcompany()
    {
        return $this->hasMany(LinkQrCompany::class,'qr_code','qr_code');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function guider()
    {
        return $this->belongsTo(Guider::class);
    }
}
