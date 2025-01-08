<?php

namespace App\Enums;

enum UserType: string
{
    case Individual = 'individual';
    case Company = 'company';

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
