<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class EntrustRole
{
    const DELIMITER = '|';

    protected $auth;

    /**
     * Creates a new instance of the middleware.
     *
     * @param Guard $auth
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Closure $next
     * @param  $roles
     * @return mixed
     */
    public function handle($request, Closure $next, $roles)
    {
        if (!is_array($roles)) {
            $roles = explode(self::DELIMITER, $roles);
        }

        if ($this->auth->guest()) {
            return response()->json(['Forbidden'], 403);
        }

        $arrayRole = ["company", "guider", "store"];
        foreach ($roles as $role) {
            if (in_array($role, $arrayRole) && (!$request->user()->hasRole($role) || !$request->user()[$role])) {
                return response()->json(['Forbidden'], 403);
            }
        }
        
        return $next($request);
    }
}
