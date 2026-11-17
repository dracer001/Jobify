<?php

namespace App\Enums;

enum WorkRequestStatus: string
{
    //
    case InProgress = "in_progress";
    case Declined = "declined";
    case Accepted = "accepted";
    case Cancelled = "cancelled";

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
