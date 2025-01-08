<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Work;
use App\Enums\UserType;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\BillingInformation;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\File;
use Facades\App\Services\FileService;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{

    public function index(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Display a listing of the resource.
     */
    public function all(Request $request)
    {
        // Retrieve all users from the database
        $users = User::all();

        // Return the collection of users as a UserResource collection
        return UserResource::collection($users);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request)
    {
        // get authorized user
        $user = $request->user();

        // Update user details with validated data from the request
        $data = $request->validated();

        // If password is provided, hash it before saving
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Handle File Upload (profile photo and credentials)   
        if(isset($data['profile_photo']) && $data["profile_photo"] !== asset('storage/' . $user->profile_photo) ) {
            $data["profile_photo"] = FileService::saveImage($data["profile_photo"]);
            FileService::deleteFile($user->profile_photo);

        }else{
            unset($data["profile_photo"]);
        }
        if(isset($data["credential"]) && $data["credential"] !== asset('storage/' . $user->credential)) {
            echo "actual ".asset('storage/' . $user->credential)." submited = ". ($data["credential"])."\n";
            $data["credential"] = FileService::saveImage($data["credential"]);
            FileService::deleteFile($user->credential);

        }

        // delete already stored files


        // If interests were updated, sync them
        if ($request->has('interests')) {
            $user->interests()->sync($request->interests); // Sync the selected interests
        }

        // Update user data
        $user->update($data);
        
        // Optionally, you can return the updated user as a response
        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Get the currently authenticated user
        $user = $request->user();
    
        // Detach related interests (many-to-many relationship)
        $user->interests()->detach();
    
        // Soft delete the user
        $user->delete();
    
        // Delete associated files (profile photo and credential)
        FileService::deleteFile($user->profile_photo);
        FileService::deleteFile($user->credential);
    
        return response()->json([
            'message' => "User with ID {$user->id} has been soft deleted.",
        ], 204);
    }
    
    public function billing_info()
    {
        return $this->hasOne(BillingInformation::class);
    }

    public function getTopUsers(?int $limit = 5)
    {
        // Fetch top users based on 'individual' user_type
        $individuals = DB::table('users')
            ->join(DB::raw('(
                SELECT employee_id AS user_id, COUNT(*) AS work_count
                FROM works
                GROUP BY employee_id
                ORDER BY work_count DESC
                LIMIT ' . (int)$limit . '
            ) AS top_user'), 'users.id', '=', 'top_user.user_id')
            ->where('users.user_type', 'individual') // Only individual users
            ->select('users.*', 'top_user.work_count')
            ->orderByDesc('top_user.work_count')
            ->get(); // Returns a collection of stdClass objects
    
        // Fetch top users based on 'company' user_type
        $companies = DB::table('users')
            ->join(DB::raw('(
                SELECT employer_id AS user_id, COUNT(*) AS work_count
                FROM works
                GROUP BY employer_id
                ORDER BY work_count DESC
                LIMIT ' . (int)$limit . '
            ) AS top_user'), 'users.id', '=', 'top_user.user_id')
            ->where('users.user_type', 'company') // Only company users
            ->select('users.*', 'top_user.work_count')
            ->orderByDesc('top_user.work_count')
            ->get(); // Returns a collection of stdClass objects
    
        // Convert stdClass objects for individual users to Eloquent models with additional data
        $individualUsers = $individuals->map(function ($user) {
            $userModel = User::find($user->id); // Fetch the actual User model
            
            // Add the work_count to the User model as a custom attribute
            $userModel->work_count = $user->work_count;
            
            return $userModel; // Return the Eloquent model with additional data
        });
    
        // Convert stdClass objects for company users to Eloquent models with additional data
        $companyUsers = $companies->map(function ($user) {
            $userModel = User::find($user->id); // Fetch the actual User model
            
            // Add the work_count to the User model as a custom attribute
            $userModel->work_count = $user->work_count;
            
            return $userModel; // Return the Eloquent model with additional data
        });
    
        // Combine both the individual and company users into one array
        $result = [
            'individual' => UserResource::collection($individualUsers),
            'company' => UserResource::collection($companyUsers),
        ];
    
        // Return the result as a response
        return response()->json($result);
    }
    
    public function getUserActivities(Request $request, ?int $limit = 5 )
    {
        // Get the authenticated user
        $user = $request->user();
    
        // Validate and retrieve the limit parameter
    
        // Ensure the limit is an integer within a reasonable range
        $validatedLimit = max(1, min((int)$limit, 100)); // Ensure it's between 1 and 100
    
        // Fetch paginated activities for the current user
        $activities = Activity::where('user_id', $user->id)
            ->paginate($validatedLimit);
    
        if ($activities->isEmpty()) {
            return response()->json([], 204); // Empty response, indicating no content
        }
        
        // Return the paginated activities
        return response()->json($activities);
    }
    
    // public function getTopUsers(Request $request)
    // {
    //     $limit = $request->query('limit', 10); // Default limit to 10 if no limit is passed

    //     // Call a method in the User model or service to fetch top users
    //     $users = User::getTopUsersWithWorkCount($limit);
    
    //     // Return the transformed data using UserResource
    //     return UserResource::collection($users);
    // }

    // public function getTopUsers(Request $request)
    // {
    // $limit = $request->input('limit', 10); // Default limit to 10 if no limit is passed

    // // Fetch the top users using the scope
    // $users = User::topUsers($limit);

    // // Return the response using a resource collection (optional)
    // return UserResource::collection($users);
    // }

}
