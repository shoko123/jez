<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\GeneralJsonException;

class EnsureReadAccessibility
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (env('ACCESSIBILITY_AUTHENTICATED_ONLY') && !$request->user()) {
            throw new GeneralJsonException('Only Authorized users are allowed to use this route!', 401);
        }
        return $next($request);
    }
}
