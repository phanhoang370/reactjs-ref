<?php
namespace  App\Repositories\Permission;
use App\Repositories\BaseRepository;
use App\Models\Permission;

class PermissionRepository extends BaseRepository implements PermissionInterface
{
    public function model()
    {
        return Permission::class;
    }
}
