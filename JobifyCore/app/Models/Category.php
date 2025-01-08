<?php

// app/Models/Category.php
namespace App\Models;

use App\Models\Work;
use App\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    
    // Many-to-many relationship with Job
    public function works()
    {
        return $this->belongsToMany(Work::class, 'category_work');
    }
}
