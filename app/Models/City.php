<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $primaryKey = 'city_id';

    protected $fillable = [
        'city_name',
        'city_ko_name',
        'city_en_name',
        'city_vn_name',
    ];

    protected $appends = ['id'];

    public function getIdAttribute()
    {
        return $this->city_id;
    }

    public function guiders()
    {
        return $this->hasMany(Guider::class, 'city_id', 'city_id');
    }
}
