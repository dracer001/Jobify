<?php

namespace App\Enums;

enum WorkRequestType: string
{
    //
    case RequestIn = "request_in";
    case RequestOut = "request_out";

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
