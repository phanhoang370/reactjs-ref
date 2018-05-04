<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $primaryKey = 'store_id';
    
    protected $fillable = [
        'store_name',
        'store_phone',
        'country_id',
        'city_id',
        'store_address',
        'GPSX',
        'GPSY',
        'user_id',
        'home_page',
        'description',
        'type_id',
    ];

    public function companies()
    {
        return $this->belongsToMany(Store::class, 'link_company_store', 'store_id', 'company_id')
                    ->withPivot('dc_rate', 'company_fee_rate');
    }

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id', 'type_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'store_id', 'store_id');
    }

    public function linkCompanyStores()
    {
        return $this->hasMany(LinkCompanyStore::class, 'store_id', 'store_id');
    }
}
