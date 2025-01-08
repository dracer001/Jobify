<?php

// app/Enums/Category.php


namespace App\Enums;

enum Status: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Terminated = 'terminated';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}


