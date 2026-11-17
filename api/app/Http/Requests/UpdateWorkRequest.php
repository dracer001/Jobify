<?php

namespace App\Http\Requests;

use App\Enums\Status;
use App\Rules\Base64Image;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateWorkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $work = $this->route('work');

        if ($this->user()->id !== $work->employer_id) {
            return false;
        }
        return true;
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'category_id' => 'exists:categories,id', // Category must exist in the categories table
            'description' => 'string|max:1000',
            'employee_id' => 'nullable|exists:users,id', // Employee ID must exist in users table
            'image' => [
                'nullable',
                'string',   
                new Base64Image(2 * 1024 * 1024), 
            ], // Image validation
            'salary' => 'nullable|numeric|min:0', // Salary should be a positive number or null
            'status' => new Enum(Status::class), // Enum validation for 'status'
            'employee_payment_status' => new Enum(Status::class), // Enum validation for 'employee_payment_status'
            'employer_payment_status' => new Enum(Status::class), // Enum validation for 'employer_payment_status'
            'employee_payment_id' => 'nullable|string|max:255', // Optional payment ID for employee
            'employer_payment_id' => 'nullable|string|max:255', // Optional payment ID for employer
            'tags' => 'nullable|array', // Tags should be an array if provided
            'tags.*' => 'exists:tags,id', // Ensure each tag exists in the 'tags' table
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'title' => 'job title',
            'category_id' => 'category',
            'description' => 'job description',
            'employee_id' => 'employee',
            'image' => 'job image',
            'salary' => 'salary',
            'status' => 'job status',
            'employee_payment_status' => 'employee payment status',
            'employer_payment_status' => 'employer payment status',
            'employee_payment_id' => 'employee payment ID',
            'employer_payment_id' => 'employer payment ID',
            'tags' => 'tags',
        ];
    }
}
