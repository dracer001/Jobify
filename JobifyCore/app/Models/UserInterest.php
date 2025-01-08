<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInterest extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'user_intrests'; // Or 'user_interests' if you rename the table

    // The attributes that are mass assignable
    protected $fillable = [
        'user_id',
        'interest_id',
    ];

    /**
     * Get the user that owns the UserInterest.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the interest associated with the UserInterest.
     */
    public function interest()
    {
        return $this->belongsTo(Interest::class);
    }
}
