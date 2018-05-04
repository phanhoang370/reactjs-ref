<?php
namespace App\Repositories\Role;

interface RoleInterface
{
    public function findRole($id);
    public function getRoleForCreateUpdate();
}
