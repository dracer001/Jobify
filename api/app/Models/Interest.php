<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    use HasFactory;

    // Define the relationship with users
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_intrests', 'interest_id', 'user_id');
    }
}
