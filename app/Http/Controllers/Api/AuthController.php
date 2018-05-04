<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use DB;
use Illuminate\Support\Facades\Password;
use App\Repositories\User\UserInterface;
use App\Jobs\SendUserVerificationEmail;
use Carbon\Carbon;

class AuthController extends Controller
{
    protected $userRepository;

    public function __construct (UserInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if ($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages(),
            ], 400);
        }

        $credentials['is_verified'] = 1;

        if ($request->remember) {
            $customClaims = Carbon::now(config('app.timezone'))->addYear(50)->getTimestamp();
        } else {
            $customClaims = 60;
        }

        try {
            // attempt to verify the credentials and create a token for the user
            if ($request->remember) {
                $token = JWTAuth::attempt($credentials, ['exp' => $customClaims]);
            } else {
                $token = JWTAuth::attempt($credentials);
            }

            if (!$token) {
                return response()->json([
                    'success' => false, 
                    'error' => 'We cant find an account with this credentials.',
                ], 401);
            }
            
            $user = $this->userRepository->getAuthenticateUser($token);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json([
                'success' => false, 
                'error' => 'Failed to login, please try again.',
            ], 500);
        }

        // all good so return the token
        return response()->json([
            'success' => true, 
            'data'=> [ 
                'token' => $token,
                'user'  => $user
            ],
        ]);
    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json([
                'success' => true, 
                'message'=> 'You have successfully logged out.',
            ]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json([
                'success' => false, 
                'error' => 'Failed to logout, please try again.',
            ], 500);
        }
    }

    /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json([
                'success' => false, 
                'error' => [
                    'email'=> $error_message,
                ]
            ], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }
        return response()->json([
            'success' => true, 
            'data'=> [
                'message'=> 'A reset email has been sent! Please check your email.',
            ]
        ]);
    }

    public function getPermission()
    {
        $user = $this->userRepository->getAuthenticateUser(JWTAuth::getToken());

        return response()->json([
            'success' => true, 
            'data'=> [ 
                'user'  => $user
            ],
        ]);
    }
}
