<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Enums\Status;
use App\Models\WorkRequest;
use Illuminate\Http\Request;
use App\Enums\WorkRequestStatus;
use App\Http\Resources\WorkResource;
use Facades\App\Services\FileService;
use App\Http\Requests\StoreWorkRequest;
use App\Http\Requests\UpdateWorkRequest;

class WorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return WorkResource::collection(
            Work::where('employer_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(5)
        );
    }

    public function all(Request $request)
    {
        // Retrieve all users from the database
        $work = Work::all();

        // Return the collection of users as a UserResource collection
        return WorkResource::collection($work);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkRequest $request)
    {
        //
        $data = $request->validated();

        $work = Work::create($data);

        return new WorkResource($work);
    }

    /**
     * Display the specified resource.
     */
    public function show(Work $work, Request $request)
    {
        $user = $request->user();
    
        // Check if the status is pending
        if ($work->employer_payment_status === Status::Pending) {
            // Validate employer_id if status is pending
            if ($work->employer_id !== $user->id) {
                return response()->json([
                    'message' => 'Unauthorized action.',
                ], 403); // 403: Forbidden, as the user is not authorized
            }
        }
    
        // Return the work resource if the conditions are met or status is not pending
        return new WorkResource($work);
    }
    
    


    /**
     * Update the specified resource in storage.
     */
    public function update( Work $work, UpdateWorkRequest $request)
    {

        // Update user details with validated data from the request
        $data = $request->validated();

        // Handle File Upload (profile photo and credentials)   
        if(isset($data['image'])) {
            $data["image"] = FileService::saveImage($data["image"]);
        }

        // delete already stored files
        FileService::deleteFile($work->image);

        // Update user data
        $work->update($data);
        
        // Optionally, you can return the updated user as a response
        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $work
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Work $work, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $work->employer_id) {
            return abort(403, 'Unauthorized action.');
        }
        $work->delete();
        FileService::deleteFile($work->image);

        return response()->json([
            'message' => "Work with ID {$work->id} has been deleted.",
        ], 204);
    }

    
    // public function recomendation(Request $request)
    // {
    //     $userId = $request->user()->id;
    
    //     $jobs = Work::with([
    //         'employer' => function ($query) {
    //             $query->select('id', 'user_type', 'first_name', 'last_name', 'company_name');
    //         }
    //     ])
    //         ->whereNull('employee_id') // Exclude jobs with an assigned employee
    //         ->where('employer_id', '!=', $userId) // Exclude jobs created by the current user
    //         ->where('employer_payment_status', Status::Completed) // Exclude jobs where payment status is not completed
    //         ->orderBy('created_at', 'desc')
    //         ->paginate($request->query('limit', 10));
    
    //     return WorkResource::collection($jobs);
    // }
    public function recomendation(Request $request)
    {
        $userId = $request->user()->id;

        $jobs = Work::with([
            'employer' => function ($query) {
                $query->select('id', 'user_type', 'first_name', 'last_name', 'company_name');
            }
        ])
            ->whereNull('employee_id') // Exclude jobs with an assigned employee
            ->where('employer_id', '!=', $userId) // Exclude jobs created by the current user
            ->where('employer_payment_status', Status::Completed) // Exclude jobs where payment status is not completed
            ->whereNotIn('id', function ($query) use ($userId) {
                $query->select('work_id')
                    ->from('work_requests')
                    ->where('user_id', $userId);
            }) // Exclude works that the user has already requested
            ->orderBy('created_at', 'desc')
            ->paginate($request->query('limit', 10));

        return WorkResource::collection($jobs);
    }

    
    
    public function work_id_by_user(Work $work, Request $request) {

        if ($request->user()->id !== $work->employer_id) {
            return response()->json([
                'message' => 'Unauthorized action.'
            ], 403);
        }
        return new WorkResource($work);

    }


    public function add_request_work(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'work_id' => 'required|exists:works,id', // Ensure work_id exists in works table
        ]);
        $validatedData['user_id'] = $request->user()->id;
        // Check if the request already exists to prevent duplicates
        $existingRequest = WorkRequest::where('user_id', $validatedData['user_id'])
            ->where('work_id', $validatedData['work_id'])
            ->first();
    
        if ($existingRequest) {
            return response()->json(['message' => 'Work request already exists.'], 409); // Conflict status
        }
    
        // Add default status to the validated data
        $validatedData['status'] = WorkRequestStatus::InProgress;
    
        // Create the work request
        $workRequest = WorkRequest::create($validatedData);
    
        return response()->json([
            'message' => 'Work request successfully created.',
            'data' => $workRequest,
        ], 201); // Created status
    }
    

    public function user_work_associate(Request $request)
    {
        $userId = $request->user()->id;

        // 1. Works the user created
        $createdWorks = Work::where('employer_id', $userId)
            ->get();

        // 2. Works that the user is working on
        $workingOnWorks = Work::where('employee_id', $userId)
            ->get();

        // 3. Works that the user has requested, including the request status
        $requestedWorks = Work::whereHas('workRequest', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('employer_id', '!=', $userId) // Exclude works created by the user
            ->where('employee_id', '!=', $userId) // Exclude works where the user is the employee
            ->with(['workRequest' => function ($query) use ($userId) {
                $query->select('work_id', 'status', 'type')
                      ->where('user_id', $userId); // Filter requests to only the user's requests
            }])
            ->get();

        // Format response
        return response()->json([
            'createdJobs' => $createdWorks,
            'handlingJobs' => $workingOnWorks,
            'requestedJobs' => $requestedWorks
        ]);
    }

    // public function userWorks(Request $request)
    // {
    //     $userId = $request->user()->id;

    //     // 1. Works the user created
    //     $createdWorks = Work::with([
    //         'employer' => function ($query) {
    //             $query->select('id', 'user_type', 'first_name', 'last_name', 'company_name');
    //         }
    //     ])
    //         ->where('employer_id', $userId)
    //         ->get();

    //     // 2. Works that the user is working on
    //     $workingOnWorks = Work::with([
    //         'employer' => function ($query) {
    //             $query->select('id', 'user_type', 'first_name', 'last_name', 'company_name');
    //         }
    //     ])
    //         ->where('employee_id', $userId)
    //         ->get();

    //     // 3. Works that the user has requested, including the request status
    //     $requestedWorks = Work::with([
    //         'employer' => function ($query) {
    //             $query->select('id', 'user_type', 'first_name', 'last_name', 'company_name');
    //         },
    //         'workRequest' => function ($query) {
    //             $query->select('user_id', 'work_id', 'status');
    //         }
    //     ])
    //         ->whereHas('workRequest', function ($query) use ($userId) {
    //             $query->where('user_id', $userId);
    //         })
    //         ->get();

    //     // Format response
    //     return response()->json([
    //         'created_works' => $createdWorks,
    //         'working_on_works' => $workingOnWorks,
    //         'requested_works' => $requestedWorks
    //     ]);
    // }

}
