<?php

namespace App\Enums;

enum Gender: string
{
    //
    case Male = "male";
    case Female = "female";
    case Others = "others";

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
