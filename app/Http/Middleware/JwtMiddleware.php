<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Auth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status_code'=> 404, 'status' => 'ERR_INVALID_TOKEN', 'message'=>'Token is Invalid'], 404);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['status_code'=> 401, 'status' => 'ERR_EXPIRED_TOKEN', 'message'=>'Token has expired'], 401);
            }else{
                return response()->json(['status' => 'Authorization Token not found'], 404);
            }
        }
        
        return $next($request);
    }
}
