<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Closure;

class Base64Image implements ValidationRule
{
    protected $maxSize;

    // Constructor to pass in the maximum file size (default is 5MB)
    public function __construct($maxSize = 5 * 1024 * 1024)
    {
        $this->maxSize = $maxSize;
    }

    // Correct method signature for validate method
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the Base64 string contains a valid image MIME type (jpeg, jpg, png, gif)
        if (!preg_match('/^data:image\/(jpeg|jpg|png|gif);base64,/', $value)) {
            // Call the fail closure to report the error
            $fail('The ' . $attribute . ' must be a valid Base64 encoded image (jpeg, jpg, png, gif).');
        }

        // Extract the Base64 string part after the MIME type
        $imageData = substr($value, strpos($value, ',') + 1);

        // Decode the Base64 string
        $decodedImageData = base64_decode($imageData);

        // Check if the file size exceeds the maximum allowed size
        if (strlen($decodedImageData) > $this->maxSize) {
            // Call the fail closure to report the error
            $fail('The ' . $attribute . ' must not exceed the maximum size of ' . number_format($this->maxSize / (1024 * 1024), 2) . ' MB.');
        }
    }
}
