<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Facades\App\Services\NotificationService;
use Symfony\Component\HttpFoundation\Response;

class StoreNotification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $activityType, $message = "")
    {
        $response = $next($request);

        // Check if the user is authenticated
        if (auth()->check()) {
            // Store the activity and notification (if needed)
            $user = auth()->user();

            NotificationService::store($user, $activityType, $message);
        }

        return $response;
    }
}
