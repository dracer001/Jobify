<?php

namespace App\Models;

use App\Models\Work;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function works()
    {
        return $this->belongsToMany(Work::class, 'work_tag');
    }
}
