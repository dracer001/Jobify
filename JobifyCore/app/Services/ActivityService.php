<?php

namespace App\Services;

use App\Models\Activity;
use Illuminate\Support\Facades\Log;

class ActivityService
{
    /**
     * Send a activity to a user.
     *
     * @param \App\Models\User $user
     * @param string $type
     * @param string $message
     * @param array $extraData
     * @return \App\Models\Notification
     */
    public function store($user, string $type, string $message="")
    {

        if(empty($message)) {
            $message = $this->generate_message($type);
        }

        try {
            // Create activity in the database
            $activity = Activity::create([
                'user_id' => $user->id,
                'type' => $type,
                'details' => $message,
                'is_read' => false, // Mark as unread by default
            ]);

            return $activity;
        } catch (\Exception $e) {
            Log::error("Failed to send activity: " . $e->getMessage());
            throw $e;
            return null; // Return null if the activity fails to be created
        }
    }

    public function generate_message(string $type): string
    {
        switch ($type) {

            case 'signup':

                return "You signed up";
                # code...
            
            case 'signin':

                return "You logged in";
                # code...
            case 'signout':

                return "You signed out";
                # code...
            
            default:
                # code...
                return "";
        }
    }
}
