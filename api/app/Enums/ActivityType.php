<?php

// app/Enums/ActivityType.php

namespace App\Enums;

enum ActivityType : string
{
    // User Account Activities
    case SIGN_UP = 'signup';
    case SIGNIN = 'signin';
    case SIGNOUT = 'signout';
    case PASSWORD_CHANGE = 'password_change';
    case EMAIL_VERIFIED = 'email_verified';
    case PROFILE_UPDATED = 'profile_updated';

    // Job-related Activities
    case JOB_CREATED = 'job_created';
    case JOB_UPDATED = 'job_updated';
    case JOB_DELETED = 'job_deleted';
    case JOB_APPLIED = 'job_applied';
    case JOB_ACCEPTED = 'job_accepted';
    case JOB_COMPLETED = 'job_completed';
    case JOB_REJECTED = 'job_rejected';
    case JOB_PAUSED = 'job_paused';
    case JOB_RESUMED = 'job_resumed';

    // Payment and Transaction Activities
    case PAYMENT_RECEIVED = 'payment_received';
    case PAYMENT_MADE = 'payment_made';
    case REFUND_ISSUED = 'refund_issued';
    case BALANCE_UPDATED = 'balance_updated';
    case TRANSACTION_FAILED = 'transaction_failed';
    case TRANSACTION_PENDING = 'transaction_pending';
    case TRANSACTION_SUCCESSFUL = 'transaction_successful';

    // Notifications and Alerts
    case NOTIFICATION_READ = 'notification_read';
    case NOTIFICATION_IGNORED = 'notification_ignored';
    case ALERT_RECEIVED = 'alert_received';

    // Settings and Preferences
    case NOTIFICATIONS_UPDATED = 'notifications_updated';
    case ACCOUNT_DELETED = 'account_deleted';
    case BILLING_UPDATED = 'billing_updated';
    case LANGUAGE_CHANGED = 'language_changed';

    // System or Admin Activities
    case USER_BANNED = 'user_banned';
    case USER_UNBANNED = 'user_unbanned';
    case USER_SUSPENDED = 'user_suspended';
    case USER_REACTIVATED = 'user_reactivated';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
