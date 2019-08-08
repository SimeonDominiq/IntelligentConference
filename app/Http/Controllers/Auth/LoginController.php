<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use \Illuminate\Http\Response as Res;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\APITrait;

use App\User;

use JWTAuth;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers, APITrait;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request) {
        $rules = array (
            'email' => 'required|email',
            'password' => 'required|min:6',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator-> fails()){
            $errorString = implode(",",$validator->messages()->all());
            return $this->respondValidationError($errorString);
        } else {
            $credentials = request(['email', 'password']);
            try {
                if (!$token = Auth::attempt($credentials)) {
                    return $this->respondWithError("Invalid Email or Password");
                }
            } catch (JWTException $e) {
                return $this->respondWithError("Could not create token");
            }

            $currentUser = Auth::user();
            $currentUser->role = 2;
            $currentUser['token'] = $token;

            return $this->respond([
                'status'        => 'success',
                'status_code'   => $this->getStatusCode(),
                'message'       => 'User LoggedIn successfully!',
                'user'          => $currentUser
            ]);                         
        }
    }
    
    public function logout(Request $request) {
        /* Perform Validation on request data */
        $validator = Validator::make($request->all(), [
            'token'     => 'required'
        ]);
        
        if($validator->fails()){
            $errorString = implode(",",$validator->messages()->all());
            return $this->respondValidationError('Fields Validation Failed. '.$errorString);
        }
                
        try {
            $token = JWTAuth::getToken();
            //dd($request->token, $token);
            JWTAuth::parseToken()->invalidate();
 
            return $this->respond([
                'status'        => 'success',
                'status_code'   =>  $this->getStatusCode(),
                'message'       => 'User logged out successfully!'
            ]); 
        } catch (Exception $exception) {
            return $this->respondWithError("Error logging user out!");
        }
    }    
}
