<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\ValidationRule;
use Closure;

class Base64Doc implements ValidationRule
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
        // Check if the Base64 string contains a valid document MIME type (pdf, docx, txt)
        if (!preg_match('/^data:(application\/pdf|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|text\/plain);base64,/', $value)) {
            // Call the fail closure to report the error
            $fail('The ' . $attribute . ' must be a valid Base64 encoded document (PDF, DOCX, TXT).');
        }

        // Extract the Base64 string part after the MIME type
        $documentData = substr($value, strpos($value, ',') + 1);

        // Decode the Base64 string
        $decodedDocumentData = base64_decode($documentData);

        // Check if the file size exceeds the maximum allowed size
        if (strlen($decodedDocumentData) > $this->maxSize) {
            // Call the fail closure to report the error
            $fail('The ' . $attribute . ' must not exceed the maximum size of ' . number_format($this->maxSize / (1024 * 1024), 2) . ' MB.');
        }
    }
}
