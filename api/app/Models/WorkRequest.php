<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'work_id',
        'status',
        'type',
    ];

    // Relationship to User (the user who made the request)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship to Work (the work being requested)
    public function work()
    {
        return $this->belongsTo(Work::class);
    }
//     public function work()
// {
//     return $this->belongsTo(Work::class, 'work_id');
// }

}
