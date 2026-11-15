<?php

namespace App\Enums;

enum UserStatus: string
{
    case Active = 'active';
    case Deactivated = 'deactivated';
    case Suspended = 'suspended';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
