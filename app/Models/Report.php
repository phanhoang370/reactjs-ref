<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'v_rpt_bills';
    protected $guarded = [];

    public function guider()
    {
        return $this->belongsTo(Guider::class,'guid_id','guid_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class,'store_id','store_id');
    }

}
