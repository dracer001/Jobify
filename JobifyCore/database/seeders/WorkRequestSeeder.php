<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use App\Models\WorkRequest;
use App\Models\Work;
use App\Models\User;
use App\Enums\WorkRequestStatus;
use App\Enums\WorkRequestType;
use Illuminate\Support\Facades\DB;

class WorkRequestSeeder extends Seeder
{
    public function run()
    {
        // Fetch all users
        $users = User::pluck('id')->toArray();

        // Fetch all works
        $works = Work::whereNull('employee_id') // Ensure no assigned employee
            ->where('employer_payment_status', 'completed') // Ensure payment status is completed
            ->get();

        $requests = [];
        echo "Eligible works: " . $works->count() . PHP_EOL;

        foreach ($works as $work) {
            // Exclude the employer from making a request
            $eligibleUsers = array_filter($users, function ($userId) use ($work) {
                return $userId !== $work->employer_id;
            });
            echo "Work ID {$work->id} has " . count($eligibleUsers) . " eligible users." . PHP_EOL;

            // Randomly select eligible users to make requests
            $requestingUsers = collect($eligibleUsers)
                ->random(rand(1, min(3, count($eligibleUsers)))) // Up to 3 users per work
                ->toArray();

            foreach ($requestingUsers as $userId) {
                // Check if a request already exists
                $existingRequest = WorkRequest::where('user_id', $userId)
                    ->where('work_id', $work->id)
                    ->exists();
                if ($existingRequest) {
                    echo "Request already exists for Work ID {$work->id} and User ID {$userId}." . PHP_EOL;
                }
                    
                if (!$existingRequest) {
                    $requests[] = [
                        'user_id' => $userId,
                        'work_id' => $work->id,
                        'status' => $this->getRandomStatus(), // Dynamically select a status
                        'type' => $this->getRandomType(), // Dynamically select a type
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        // Bulk insert requests to optimize performance
        DB::table('work_requests')->insert($requests);

        echo count($requests) . " work requests seeded successfully.";
    }

    /**
     * Get a random status from WorkRequestStatus enum.
     */
    private function getRandomStatus()
    {
        $statuses = WorkRequestStatus::cases(); // Get all enum cases
        return $statuses[array_rand($statuses)]->value; // Pick a random status
    }

    /**
     * Get a random type from WorkRequestType enum.
     */
    private function getRandomType()
    {
        $types = WorkRequestType::cases(); // Get all enum cases
        return $types[array_rand($types)]->value; // Pick a random type
    }
}
