<?php

namespace App\Models;

use Zizaco\Entrust\EntrustPermission;

class Permission extends EntrustPermission
{
    protected $primaryKey = 'permission_id';

    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];
}
