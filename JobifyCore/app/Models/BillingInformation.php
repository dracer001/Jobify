<?php

// app/Models/BillingInformation.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'credit_card_number', 'credit_card_expiry_date', 'credit_card_cardholder_name', 
        'bank_account_number', 'bank_account_name', 'bank_name', 'bank_account_type', 'swift_code'
    ];

    // Define the relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
