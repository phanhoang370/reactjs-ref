<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\User\UserInterface;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\Guider\GuiderInterface;
use App\Repositories\Store\StoreInterface;
use App\Jobs\SendUserVerificationEmail;
use DB;
use Validator;
use Exception;
use App\Http\Requests\CreateUserRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{
    protected $userRepository;
    protected $companyRepository;
    protected $guiderRepository;
    protected $storeRepository;

    public function __construct (
        UserInterface $userRepository,
        CompanyInterface $companyRepository,
        GuiderInterface $guiderRepository,
        StoreInterface $storeRepository
    ) {
        $this->userRepository = $userRepository;
        $this->companyRepository = $companyRepository;
        $this->guiderRepository = $guiderRepository;
        $this->storeRepository = $storeRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->userRepository->getAllUser();

        return response()->json([
            'data' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $user = [
            'email' => $request->email,
            'name' => $request->name,
            'password' => $request->password,
            'is_verified' => 1,
        ];

        $role = $request->roles;

        DB::beginTransaction();
        try {
            if ($role == 2 && $request->company) {
                $user['company_id'] = $request->company;
            }
            $user = $this->userRepository->createUser($user);
            $user->roles()->sync($role);

            if ($role == 3 && $request->guider) {
                $this->guiderRepository->update($request->guider, [
                    'user_id' => $user->user_id,
                ]);
            }
            if ($role == 4 && $request->store) {
                $this->storeRepository->createUser($request->store, $user);
            }

            DB::commit();

            return response()->json([
                'success'=> true, 
                'data'=> $user, 
                'message'=> 'Create user successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success'=> false,
                'message'=> $e->getMessage(),
            ]);
        }
    }

    public function sendEmail($mailTo, $token)
    {
        $job = (new SendUserVerificationEmail($mailTo, $token))
            ->onConnection('database')
            ->onQueue('emails');
        $this->dispatch($job);
    }

    public function generateToken()
    {
        return str_random(30);
    }
    
    /**
     * API Verify User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyUser($verification_code)
    {
        $user = $this->userRepository->verification($verification_code);

        if (!$user) {
            return response()->json([
                'success'=> false, 
                'error'=> "Verification code is invalid.",
            ]);
        }
        
        return response()->json([
            'success'=> true,
            'message'=> 'You have successfully verified your email address.',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
                'success' => false,
            ], 404);
        }
        try {
            $user = $this->userRepository->findUser($id);
            if (!$user->company) {
                unset($user['company']);
            }
            if (!$user->guider) {
                unset($user['guider']);
            }
            if (count($user->store) == 0) {
                unset($user['store']);
            }

            return response()->json([
                'success' => true,
                'data' => $user,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($id == 1) {
            return response()->json([
                'success'=> false,
                'message'=> 'Can not edit this user',
            ]);
        }
        $user = [
            'email' => $request->email,
            'name' => $request->name,
        ];

        $role = $request->roles;

        // if ($role == 2) {
        //     $user['company_id'] = null;
        // }

        DB::beginTransaction();
        try {
            if ($role == 2 && $request->company) {
                $user['company_id'] = $request->company;
            }
            $user = $this->userRepository->update($id, $user);
            $user->roles()->sync($role);

            if ($role == 3 && $request->guider) {
                $this->guiderRepository->updateUser($request->guider, [
                    'user_id' => $user->user_id,
                ]);
            }
            if ($role == 4 && $request->store) {
                $this->storeRepository->createUser($request->store, $user);
            }
            

            DB::commit();

            return response()->json([
                'success'=> true, 
                'message'=> 'Update user successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success'=> false,
                'message'=> $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $deleteUser = $this->userRepository->deleteUser($id);

        if ($deleteUser) {
             return response()->json([
                'success' => true,
                'data' => $id,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => "can not delete this user",
        ], 403);
    }

    public function resetPasswordByUser(Request $request, $id)
    {
        $data = [
            'password' => $request->password,
        ];

        $user = $this->userRepository->resetPasswordByUser($id, $data);

        if ($user) {
            return response()->json([
                'success' => true,
                'data' => $user,
            ]);
        }

        return response()->json([
            'success' => false,
        ], 404);
    }
}
