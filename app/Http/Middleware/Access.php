<?php

namespace App\Http\Middleware;

use Closure;

class Access
{
  

    public function handle($request, Closure $next)
    {
        $d = config('accessibility.accessibility');
        $authorizedUsersOnly = $d["authorizedUsersOnly"];
        if (!$authorizedUsersOnly || !is_null(auth('api')->user())) {
            return $next($request);
        } else {
            return response()->json([
                "msg" => "api is only available to authorized users at this time",
                //"authorizedUsersOnly" => $this->globalSettings->authorizedUsersOnly(),
                //"user" => auth('api')->user(),
            ], 401);
        }
    }
}
