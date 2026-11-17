<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'company_name' => $this->company_name,
            'title' => $this->title,
            'email' => $this->email,
            'about' => $this->about,
            'phone_number' => $this->phone_number,
            'company_website' => $this->company_website,
            'address' => $this->address,
            'country' => $this->country,
            'city' => $this->city,
            'gender' => $this->gender,
            'profile_photo' => $this->profile_photo && filter_var($this->profile_photo, FILTER_VALIDATE_URL) 
    ? $this->profile_photo  // If it's a valid external URL
    : ($this->profile_photo ? asset('storage/' . $this->profile_photo) : null), // If it's a relative path

            // 'profile_photo' => $this->profile_photo ? asset('storage/' . $this->profile_photo) : null,
            'credential' => $this->credential ? asset('storage/' . $this->credential) : null,
            'user_type' => $this->user_type,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'interests' => $this->interests->map(function ($interest) {
                return [
                    'id' => $interest->id,      // Pluck the ID of the interest
                    'name' => $interest->name,  // Pluck the name of the interest
                ];
            }),
        ];
    }
}
