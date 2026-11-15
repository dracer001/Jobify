<?php

namespace App\Http\Controllers;

use App\Models\Interest;
use Illuminate\Http\Request;
use App\Http\Resources\InterestResource;

class InterestController extends Controller
{
    //
    public function index()
    {
        $interests = Interest::all();
    
        // Return the interests as a collection of InterestResources
        return InterestResource::collection($interests);
    }
}

