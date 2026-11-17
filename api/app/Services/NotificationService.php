<?php

namespace App\Services;

use App\Models\Notification;
use App\Enums\NotificationType;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send a notification to a user.
     *
     * @param \App\Models\User $user
     * @param string $type
     * @param string $message
     * @param array $extraData
     * @return \App\Models\Notification
     */
    public function store($user, string $type, string $message="")
    {
        try {
            // Create notification in the database
            $notification = Notification::create([
                'user_id' => $user->id,
                'type' => $type,
                'message' => $message,
                'is_read' => false, // Mark as unread by default
            ]);

            return $notification;
        } catch (\Exception $e) {
            Log::error("Failed to send notification: " . $e->getMessage());
            throw $e;
            return null; // Return null if the notification fails to be created
        }
    }
}
