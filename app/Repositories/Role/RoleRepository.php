<?php
namespace  App\Repositories\Role;
use App\Repositories\BaseRepository;
use App\Models\Role;
use JWTAuth;

class RoleRepository extends BaseRepository implements RoleInterface
{
    public function model()
    {
        return Role::class;
    }

    public function findRole($id)
    {
        $role = $this->with('perms')->findOrFail($id);

        return $role;
    }

    public function getRoleForCreateUpdate()
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user->hasRole('primarynet')) {
            $roles = $this->whereNotIn('role_id', [3, 4])->get();

            return $roles;
        }
        if ($user->hasRole('company')) {
            $roles = $this->whereIn('role_id', [3, 4])->get();

            return $roles;
        }

        return false;
    }
}
