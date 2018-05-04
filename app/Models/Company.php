<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use Notifiable;
    
    protected $primaryKey = 'company_id';

    protected $fillable = [
        'company_name',     // varchar(255) COLLATE utf8_bin NOT NULL
        'country_id',       // int(10) unsigned NOT NULL
        'city_id',          // int(10) unsigned NOT NULL
        'company_address',  // text COLLATE utf8_bin
        'company_tel',      // varchar(255) COLLATE utf8_bin DEFAULT NULL
        'ceo_name',         // varchar(255) COLLATE utf8_bin DEFAULT NULL
        'guid_fee_rate',    // double(4,2) DEFAULT NULL
        'home_page',
        'guide_level',
        'commission_rate',
        'contact_persion',
        'contact_email',
        'parent_commission_rate',
        'parent_company',
    ];

    public function setCommissionRateAttribute($value)
    {
        $this->attributes['commission_rate'] = json_encode($value);
    }

    public function getCommissionRateAttribute($value)
    {
        return json_decode($value);
    }

    public function user()
    {
        return $this->hasMany(User::class, 'company_id', 'company_id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id', 'country_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'city_id');
    }

    public function stores()
    {
        return $this->belongsToMany(Store::class, 'link_company_store', 'company_id', 'store_id')
                    ->withPivot('link_store_id', 'dc_rate', 'company_fee_rate', 'user_id');
    }

    public function guiders()
    {
        return $this->hasMany(Guider::class);
    }

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'company_id', 'company_id');
    }

    public function linkQrCompanies()
    {
        return $this->hasMany(LinkQrCompany::class, 'company_id', 'company_id');
    }

    public function routeNotificationForNexmo()
    {
        return $this->company_tel;
    }
}
