<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserVerification extends Model
{
    protected $primaryKey = 'user_verification_id';

    protected $fillable = [
        'user_id', 'token',
    ];

    protected $hidden = [
        'token',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
