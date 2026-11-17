<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Work;
use App\Enums\Status;
use App\Models\Category;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class WorksSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Get all categories and users
        $categories = Category::all();
        $users = User::all();

        // Ensure there are enough users and categories
        if ($users->count() < 2 || $categories->isEmpty()) {
            $this->command->error('Not enough users or categories to seed works.');
            return;
        }

        $works = [];

        for ($i = 0; $i < 120; $i++) { // Create 20 works (adjust as needed)
            // Random employer
            $employer = $users->random();

            // 50% chance of the work being open for requests
            $isOpenWork = $faker->boolean(50);

            // Random employee for closed works
            $employee = $isOpenWork ? null : $users->except($employer->id)->random();

            // Random category
            $category = $categories->random();

            // Dynamic statuses
            $statusOptions = $isOpenWork 
                ? [Status::Pending] 
                : [Status::InProgress, Status::Completed, Status::Terminated];
            $status = $faker->randomElement($statusOptions);

            $employeePaymentStatus = $employee
                ? $faker->randomElement(Status::getValues()) 
                : null;

            $employerPaymentStatus = $faker->randomElement([Status::Completed, Status::Pending]);

            // Add work to the array
            $works[] = [
                'title' => $faker->jobTitle,
                'category_id' => $category->id,
                'employer_id' => $employer->id,
                'employee_id' => $employee?->id,
                'description' => $faker->text(200),
                'salary' => $faker->randomFloat(2, 1000, 5000),
                'status' => $status,
                'employee_payment_status' => $employeePaymentStatus,
                'employer_payment_status' => $employerPaymentStatus,
                'employee_payment_id' => $employee ? $faker->optional()->uuid : null,
                'employer_payment_id' => $faker->optional()->uuid,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert works in bulk
        Work::insert($works);

        $this->command->info(count($works) . ' works seeded successfully.');
    }


    private function getRandomStatus()
    {
        $statuses = Status::cases(); // Get all enum cases
        return $statuses[array_rand($statuses)]->value; // Pick a random status
    }
}
