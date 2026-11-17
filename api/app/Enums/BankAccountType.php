<?php

namespace App\Enums;

enum BankAccountType: string
{
    //
    case Savings = "savings";
    case Current = "current";

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
