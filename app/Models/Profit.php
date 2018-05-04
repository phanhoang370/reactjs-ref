<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profit extends Model
{
    protected $primaryKey = 'prifit_id';

    protected $fillable = [
        'cost',
        'profitable_id',
        'profitable_type',
        'bill_id',
    ];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }
}
