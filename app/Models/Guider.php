<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guider extends Model
{
    protected $primaryKey = 'guid_id';

    public $incrementing = false;

    protected $fillable = [
        'guid_id',
        'guid_name',
        'guid_phone',
        'guid_resident_number',
        'manager_guid_id',
        'guid_level',
        'guid_status',
        'user_id',
        'company_id',
        'city_id'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'company_id');
    }

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'guid_id', 'guid_id');
    }

    public function linkQrCompany()
    {
        return $this->hasMany(LinkQrCompany::class, 'guid_id', 'guid_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
