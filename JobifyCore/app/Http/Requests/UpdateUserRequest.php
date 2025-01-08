<?php

namespace App\Http\Requests;

use App\Enums\Gender;
use App\Enums\UserType;
use App\Rules\Base64Doc;
use App\Rules\Base64Image;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user_photo = asset('storage/' . $this->user()->profile_photo);
        $credential = asset('storage/' . $this->user()->credential);

        return [
            'first_name' => [
                'nullable', // Allow null values
                'string',
                'max:255',
                'required_if:ref_type,individual', // Only required if regType is "individual"
            ],
            'last_name' => [
                'nullable',
                'string',
                'max:255',
                'required_if:reg_type,individual', // Only required if regType is "individual"
            ],
            'company_name' => [
                'nullable',
                'string',
                'max:255',
                'required_if:reg_type,company', // Only required if regType is "company"
            ],
            'email' => [
                'email',
                // The email must be unique except for the current user's email
                'unique:users,email,' . $this->user()->id,
            ],
            'phone_number' => 'nullable|string|max:15',
            'company_website' => 'nullable|url',
            'address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'about' => 'nullable|string|max:500',
            'gender' => [ 'nullable', new Enum(Gender::class)],
            'password' => 'string|min:8|confirmed|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[\W_]/',

            'interests' => 'nullable|array',
            'interests.*' => 'exists:interests,id',
            'reg_type' => new Enum(UserType::class), // Allow regType to be nullable if not updated
            'profile_photo' => [
                'nullable',
                'string',
                'exclude_if:profile_photo,' . $user_photo,
                new Base64Image(5 * 1024 * 1024),
            ],

            'credential' => [
                'nullable',
                'string',
                'exclude_if:credential,' . $credential,
                new Base64Doc(5 * 1024 * 1024),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        $user = $this->user();
    
        // Check if the profile photo exists and is the same as the current user's profile photo
        $profilePhoto = $this->input('profile_photo');
        $currentPhoto = asset('storage/' . $user->profile_photo);
    
        if ($profilePhoto === $currentPhoto) {
            // Remove profile_photo from the request
            $this->replace(array_diff_key($this->all(), ['profile_photo' => true]));
        }
    
        $credential = $this->input('credential');
        $currentCredential = asset('storage/' . $user->credential);
    
        if ($credential === $currentCredential) {
            // Remove credential from the request
            $this->replace(array_diff_key($this->all(), ['credential' => true]));
        }
    }

    
    public function messages()
    {
        return [
            'email.unique' => 'This email is already taken.',
            'profile_photo.string' => 'The profile photo must be a valid string (Base64 encoded).',
            'credential.string' => 'The credential must be a valid string (Base64 encoded).',
            'credential.string' => 'The credential must be a valid string (Base64 encoded).',
            'first_name.required_if' => 'First name is required when registering as an individual.',
            'last_name.required_if' => 'Last name is required when registering as an individual.',
            'company_name.required_if' => 'Company name is required when registering as a company.',
        ];
    }
}
