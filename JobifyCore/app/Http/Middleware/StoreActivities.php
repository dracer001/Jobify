<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Facades\App\Services\ActivityService;
use Symfony\Component\HttpFoundation\Response;

class StoreActivities
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $activityType, $details = "")
    {
        // Get the current route's URI path
        $currentRoute = $request->path();
    
        // If the route is '/api/signout', we store the activity first
        if ($currentRoute === '/api/auth/signout') {
            // Store activity first (before logging out)
            if (auth()->check()) {
                $user = auth()->user();
                ActivityService::store($user, $activityType, $details);
            }
    
            // Proceed with the signout process
            $response = $next($request);
        } else {
            // For other routes, proceed with the request and store activity afterward
            $response = $next($request);
    
            // Store activity after the request is processed
            if (auth()->check()) {
                $user = auth()->user();
                ActivityService::store($user, $activityType, $details);
            }
        }
    
        return $response;
    }
    
    
}
