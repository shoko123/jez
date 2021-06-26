<?php

namespace App\Http\Middleware;

use App\Settings\GlobalSettings;
use Closure;

class LoggedUsersOnly
{
    private $globalSettings;

    public function __construct(GlobalSettings $gs)
    {
        $this->globalSettings = $gs;
    }

    public function handle($request, Closure $next)
    {
//        if (!$this->globalSettings->loggedUsersOnly() || !is_null(auth('api')->user())) {
        $gs = app(GlobalSettings::class);
        $loggedUsersOnly = $gs->get()->loggedUsersOnly;
        if (!$loggedUsersOnly || !is_null(auth('api')->user())) {
            return $next($request);
        } else {
            return response()->json([
                "msg" => "api is available to logged-in users only at this time",
                //"loggedUsersOnly" => $this->globalSettings->loggedUsersOnly(),
                //"user" => auth('api')->user(),
            ], 401);
        }
    }
}
