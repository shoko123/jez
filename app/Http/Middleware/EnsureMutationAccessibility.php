<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\GeneralJsonException;

class EnsureMutationAccessibility
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (env('ACCESSIBILITY_READ_ONLY')) {
            throw new GeneralJsonException('No Mutations are allowed at this time!', 422);
        }
        return $next($request);
    }
}
