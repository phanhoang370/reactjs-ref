<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = [
        'type_name',
    ];

    public function stores()
    {
        return $this->hasMany(Store::class, 'type_id', 'type_id');
    }
}
