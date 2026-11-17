<?php

// app/Enums/NotificationType.php

namespace App\Enums;

enum NotificationType  : string
{
    // User Account Notifications
    case SIGNIN = 'signin';
    case ACCOUNT_CREATED = 'account_created';
    case PASSWORD_CHANGED = 'password_changed';
    case EMAIL_VERIFIED = 'email_verified';
    case PROFILE_UPDATED = 'profile_updated';

    // Job Notifications
    case JOB_CREATED = 'job_created';
    case JOB_ACCEPTED = 'job_accepted';
    case JOB_REJECTED = 'job_rejected';
    case JOB_COMPLETED = 'job_completed';
    case JOB_PAUSED = 'job_paused';
    case JOB_RESUMED = 'job_resumed';

    // Transaction Notifications
    case PAYMENT_RECEIVED = 'payment_received';
    case PAYMENT_SENT = 'payment_sent';
    case TRANSACTION_FAILED = 'transaction_failed';
    case TRANSACTION_SUCCESSFUL = 'transaction_successful';
    case REFUND_ISSUED = 'refund_issued';

    // System and Admin Notifications
    case SYSTEM_ALERT = 'system_alert';
    case ACCOUNT_SUSPENDED = 'account_suspended';
    case ACCOUNT_BANNED = 'account_banned';
    case ACCOUNT_REACTIVATED = 'account_reactivated';

    // Activity Notifications
    case NEW_MESSAGE = 'new_message';
    case NEW_FOLLOWER = 'new_follower';
    case MENTIONED_IN_COMMENT = 'mentioned_in_comment';
    case EVENT_INVITATION = 'event_invitation';
    case COMMENT_LIKED = 'comment_liked';

    // User Preferences and Settings Notifications
    case PREFERENCE_CHANGED = 'preference_changed';
    case NOTIFICATION_SETTING_UPDATED = 'notification_setting_updated';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
