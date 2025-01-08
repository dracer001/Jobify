<?php

namespace App\Http\Resources;

use App\Enums\UserType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkResource extends JsonResource
{

    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $employerName = $this->employer->user_type === UserType::Company
        ? $this->employer->company_name 
        : $this->employer->first_name . ' ' . $this->employer->last_name;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => [
                'id' => $this->category->id,   // Directly access properties of the category
                'name' => $this->category->name,
            ],
            'description' => $this->description,
            'employer_id' => $this->employer_id,
            'employee_id' => $this->employee_id,
            'employer_name' => $employerName,
            'salary' => $this->salary,
            'status' => $this->status,
            'employee_payment_status' => $this->employee_payment_status,
            'employer_payment_status' => $this->employer_payment_status,
            'employee_payment_id' => $this->employee_payment_id,
            'employer_payment_id' => $this->employer_payment_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }



    public function getDisplayNameAttribute()
    {
        return $this->user_type === 'company' 
            ? $this->company_name 
            : $this->first_name . ' ' . $this->last_name;
    }

}
