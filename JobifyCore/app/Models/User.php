<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Work;
use App\Enums\Gender;
use App\Enums\UserType;
use App\Models\Interest;
use App\Enums\UserStatus;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    // Add the 'deleted_at' field to the list of dates that will be cast as Carbon instances
    protected $dates = ['deleted_at'];
    
    protected $fillable = [
        'first_name',
        'last_name',
        'company_name',
        'email',
        'title',
        'phone_number',
        'company_website',
        'address',
        'country',
        'city',
        'state',
        'about',
        'gender',
        'password',
        'profile_photo',
        'credential',
        'user_type',
        'user_status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'user_type' => UserType::class,
            'user_status' => UserStatus::class,
            'gender' => Gender::class,
        ];
    }

    // Define the relationship with interests
    public function interests()
    {
        return $this->belongsToMany(Interest::class, 'user_interests', 'user_id', 'interest_id');
    }
    
    public function works()
    {
        return $this->hasMany(Work::class, 'employer_id');
    }

    public function scopeTopUsers(Builder $query, $limit = 10)
    {
        return $query->withCount('works as work_count') // Count works related to the user
                    ->where('user_type', 'individual') // Filter users by type
                    ->orderByDesc('work_count') // Order by the number of works
                    ->limit($limit); // Limit the results
    }

        public function createdWorks()
        {
            return $this->hasMany(Work::class, 'employer_id');
        }
        
        public function workingOnWorks()
        {
            return $this->hasMany(Work::class, 'employee_id');
        }
        
        public function workRequests()
        {
            return $this->hasMany(WorkRequest::class, 'user_id');
        }
    
}
