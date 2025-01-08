<?php

// app/Models/Job.php
namespace App\Models;

use App\Models\Tag;
use App\Models\User;
use App\Enums\Status;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Work extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'employer_id',
        'employee_id',
        'image',
        'salary',
        'category_id'
    ];


    protected function casts () : array
    {
        return  [
            'status' => Status::class,
            'employee_payment_status' => Status::class,
            'employer_payment_status' => Status::class,
        ];
    
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
    // Employer relationship (A job is posted by a user, the employer)
    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }
    
    // Employee relationship (A job may have an employee assigned, if accepted)
    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'work_tag');
    }

    public function workRequest()
    {
        return $this->hasMany(WorkRequest::class, 'work_id');
    }


}
