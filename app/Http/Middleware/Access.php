<?php

namespace App\Http\Middleware;

use App\Settings\GlobalSettings;
use Closure;

class Access
{
    private $globalSettings;

    public function __construct(GlobalSettings $gs)
    {
        $this->globalSettings = $gs;
    }

    public function handle($request, Closure $next)
    {
//        if (!$this->globalSettings->authorizedUsersOnly() || !is_null(auth('api')->user())) {
        $gs = app(GlobalSettings::class);
        $authorizedUsersOnly = $gs->get()->authorizedUsersOnly;
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
