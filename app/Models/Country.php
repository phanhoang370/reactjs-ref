<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $primaryKey = 'country_id';

    protected $fillable = [
        'country_name',
        'country_ko_name',
        'country_en_name',
        'country_vn_name',
    ];

    protected $appends = ['id'];

    function getIdAttribute() {
        return $this->country_id;
    }
}
