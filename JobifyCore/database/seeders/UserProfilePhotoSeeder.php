<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserProfilePhotoSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            // Randomly decide if this user gets a profile photo
            if (rand(0, 1)) { // 50% chance to assign a profile photo
                // Generate a random profile photo URL using Lorem Picsum
                $profilePhotoUrl = 'https://picsum.photos/seed/' . $user->id . '/200';
                
                // Alternatively, use UI Avatars for a user-specific image:
                // $profilePhotoUrl = 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&size=200';
                
                $user->profile_photo = $profilePhotoUrl; // Assign URL directly
            } else {
                $user->profile_photo = null; // No profile photo for this user
            }

            $user->save();
        }

        $this->command->info(count($users) . ' users processed with optional profile photos.');
    }
}
