<?php

namespace App\Models;

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    protected $primaryKey = 'role_id';

    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];
}
