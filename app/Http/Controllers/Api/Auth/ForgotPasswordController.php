<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
     */
    use SendsPasswordResetEmails;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getResetToken(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);
        if ($request->wantsJson()) {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                $error_message = "Your email address was not found.";
                return response()->json([
                    'success' => false, 
                    'error' => [
                        'email'=> [$error_message],
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
    }
}
