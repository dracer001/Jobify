<?php

namespace App\Http\Controllers;

use App\Models\WorkRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class WorkRequestController extends Controller
{
    public function getUsersByWorkId($workId)
    {
        // Get all users from work_request where work_id matches the given parameter
        $users = User::whereHas('workRequests', function ($query) use ($workId) {
            $query->where('work_id', $workId);
        })->get();

        // Return the list of users formatted as a resource collection
        return UserResource::collection($users);
    }
}
