<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

use App\Http\Traits\ApiTrait;

use App\User;

class RootController extends Controller
{
    use ApiTrait;

    public static function hashFunction($strlnt = null) {
        $length = is_null($strlnt)? 20 : $strlnt;
        $hash = substr(md5(uniqid(mt_rand(),true)),0,$length);
        return $hash;
    }

    public function getUsers() {
        $users = User::select('id', 'firstName', 'lastName')->get();
        $users = $users->toArray();
        return $this->respond([
            'status'        => 'success',
            'status_code'   => $this->getStatusCode(),
            'users'         => $users
        ]);        
    }

    function getUserName($id) {
        $user = User::select('firstName', 'lastName')->where('id', $id)->first();
        return $user->firstName.' '.$user->lastName;
    }
}
