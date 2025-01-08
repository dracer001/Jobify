<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Interest;
use App\Enums\UserType;
use App\Enums\Gender;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 10 users (you can adjust the number as needed)
        for ($i = 0; $i < 20; $i++) {
            $isCompany = $i % 2 === 0; // Alternate between individual and company

            $userData = [
                'first_name' => $isCompany ? null : $faker->firstName,
                'last_name' => $isCompany ? null : $faker->lastName,
                'title' => $isCompany ? null : $faker->word,
                'company_name' => $isCompany ? $faker->company : null,
                'email' => $faker->unique()->safeEmail,
                'phone_number' => $faker->phoneNumber,
                'company_website' => $isCompany ? $faker->url : null,
                'address' => $faker->address,
                'country' => $faker->country,
                'city' => $faker->city,
                'about' => $faker->text(200),
                'gender' => $faker->randomElement([Gender::Male, Gender::Female]),
                'password' => Hash::make('Password123!'),  // Random password
                'credential' => null, // Add logic to handle base64 doc if required
                'user_type' => $isCompany ? UserType::Company : UserType::Individual, // Randomize reg type
                'profile_photo' => null, // Add logic to handle base64 image if required
            ];

            // Create the user
            $user = User::create($userData);

            // Attach random interests (assuming the interests table is populated)
            $user->interests()->sync(Interest::inRandomOrder()->limit(3)->pluck('id')->toArray());
        }
    }
}

