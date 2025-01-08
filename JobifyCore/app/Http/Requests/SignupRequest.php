<?php

namespace App\Http\Requests;

use App\Enums\Gender;
use App\Enums\UserType;
use App\Rules\Base64Doc;
use App\Rules\Base64Image;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
        return [
            'first_name' => 'nullable|string|max:255|required_if:reg_type,individual', // Required if regType is "individual"
            'last_name' => 'nullable|string|max:255|required_if:reg_type,individual', // Required if regType is "individual"
            'title' => 'nullable|string|max:50|required_if:reg_type,individual', // Required if regType is "individual"
            'company_name' => 'nullable|string|max:255|required_if:reg_type,company', // Required if regType is "company"
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'nullable|string|max:15',
            'company_website' => 'nullable|url',
            'address' => 'required|string|max:255',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'about' => 'nullable|string|max:500',
            'gender' => ['nullable', new Enum(Gender::class)],
            'password' => 'required|string|min:8|confirmed|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[\W_]/',

            'credential' => 'nullable|string|base64document', 
            'interests' => 'nullable|array',
            'interests.*' => 'exists:interests,id',
            'reg_type' => ['required', new Enum(UserType::class)],
            'profile_photo' => [
                'nullable',
                'string',   
                new Base64Image(5 * 1024 * 1024), 
            ],
            'credential' => [
                'nullable',
                'string',
                new Base64Doc(3 * 1024 * 1024),
            ]
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'This email is already taken.',
            'profile_photo.string' => 'The profile photo must be a valid string (Base64 encoded).',
            'credential.string' => 'The credential must be a valid string (Base64 encoded).',
            'first_name.required_if' => 'First name is required when registering as an individual.',
            'last_name.required_if' => 'Last name is required when registering as an individual.',
            'title.required_if' => 'Title/Role is required when registering as an individual.',
            'company_name.required_if' => 'Company name is required when registering as a company.',
        ];
    }
}
