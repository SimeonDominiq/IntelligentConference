<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use \Illuminate\Http\Response as Res;
use App\Http\Controllers\RootController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

use App\User;
use JWTAuth;

class RegisterController extends RootController
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data){}

        public function signUp(Request $request) {
            /* Perform Validation on request data */
            $validator = Validator::make($request->all(), [
                'firstName'         => 'required|string|max:50',
                'lastName'          => 'required|string|max:50',
                'email'             => 'required|string|email|max:255|unique:users',
                'phoneNumber'       => 'required|min:11|unique:users',
                'password'          => 'required|string|min:6',
                'confirmPassword'   => 'required|min:6|same:password',
            ]);
            
            if($validator->fails()){
                $errorString = implode(",",$validator->messages()->all());
                return $this->respondValidationError($errorString);
            }
    
            $user = User::create([
                'firstName'     => $request->firstName,
                'lastName'      => $request->lastName,
                'email'         => $request->email,
                'phoneNumber'   => $request->phoneNumber,
                'password'      => $request->password,
                'reftag'        => self::hashFunction(16)
            ]);
    
            $token = JWTAuth::fromUser($user);
            $this->setStatusCode(Res::HTTP_OK);
            return $this->respond([
                'status'        => 'success',
                'status_code'   => $this->getStatusCode(),
                'message'       => 'User Registered successfully!',
                'token'         => $token
            ]);        
        }        
}
