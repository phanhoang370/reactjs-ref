<?php
namespace  App\Repositories\User;
use App\Repositories\BaseRepository;
use App\Models\User;
use App\Repositories\UserVerification\UserVerificationInterface;
use App\Repositories\Role\RoleInterface;
use App\Repositories\Guider\GuiderInterface;
use DB;
use Exception;
use JWTAuth;

class UserRepository extends BaseRepository implements UserInterface
{
    protected $userVerificationRepository;
    protected $roleRepository;

    public function __construct (
        UserVerificationInterface $userVerificationRepository,
        RoleInterface $roleRepository,
        GuiderInterface $guiderRepository
    )
    {
        $this->userVerificationRepository = $userVerificationRepository;
        $this->roleRepository = $roleRepository;
        $this->guiderRepository = $guiderRepository;
        parent::__construct();
    }

    public function model()
    {
        return User::class;
    }

    public function getAllUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $users = $this->with('roles')
            ->where('parent_id', '=', $user->user_id)
            ->get();

        return $users;
    }

    public function findUser($id)
    {
        $user = $this->with(['roles', 'company', 'guider', 'store'])->findOrFail($id);

        return $user;
    }

    public function getAuthenticateUser($token)
    {
        $user = JWTAuth::setToken($token)->toUser();
        $user = $this->with(['roles' => function($query) {
            $query->with(['perms' => function($q) {
                $q->select('permissions.permission_id', 'permissions.name');
            }]);
            $query->select('roles.role_id', 'roles.name');
            $query->get();
        }])
        ->select('user_id', 'name', 'email')
        ->withCount(['company'])
        ->find($user->user_id);

        return $user;
    }

    public function createVerification($user, $token)
    {
        $userVerification = [
            'user_id' => $user->user_id,
            'token' => $token,
        ];

        $userVerification = $this->userVerificationRepository->create($userVerification);

        return $userVerification;
    }

    public function verification($token)
    {
        DB::beginTransaction();
        try {
            $userVerification = $this->userVerificationRepository->where('token', '=', $token)->first();
            $user = $userVerification->user;
            parent::update($userVerification->user_id, ['is_verified' => 1]);
            $this->userVerificationRepository->delete($userVerification->user_verification_id);

            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollback();

            return false;
        }
        
    }

    public function createWithRole($user, $role)
    {
        $user = $this->create($user);
        $role = $this->roleRepository->where('name', '=', $role)->first();
        $user->roles()->attach($role->role_id);
        $token = $this->generateToken();
        $user->userVerification()->create([
            'token' => $token,
        ]);
        $user['token'] = $token;

        return $user;
    }

    public function generateToken()
    {
        return str_random(30);
    }

    public function deleteUser($id)
    {
        $userLoggedIn = JWTAuth::parseToken()->authenticate();
        if ($id == 1 || $userLoggedIn->user_id == $id) {
            return false;
        }
        DB::beginTransaction();
        try {
            $user = $this->find($id);
            if (count($user->store) > 0) {
                DB::table('link_company_store')->where('company_id', '=', $userLoggedIn->company->company_id)
                    ->where('store_id', '=', $user->store[0]->store_id)
                    ->update(['user_id' => null]);
            }
            if (!is_null($user->guider) && $user->guider) {
                $this->guiderRepository->update($id, [
                    'user_id' => null,
                ]);
            }
            $user->roles()->sync([]);
            $this->delete($id);
            DB::commit();

            return true;
        } catch (Exception $e) {
            DB::rollback();

            return false;
        }
    }

    public function resetPasswordByUser($id, $data)
    {
        try {
            $loggerInUser = JWTAuth::parseToken()->authenticate();

            $user = $this->where('user_id', '=', $id)->where('parent_id', '=', $loggerInUser->user_id)->firstOrFail();
            $user = $this->update($id, $data);

            return $user;
            
        } catch (\Exception $e) {
            return false;
        }
    }

    public function createUser($user)
    {
        $loggerInUser = JWTAuth::parseToken()->authenticate();

        $user['parent_id'] = $loggerInUser->user_id;
        $user = $this->create($user);

        return $user;
    }
}
