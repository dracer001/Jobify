<?php
namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FileService
{

    public function saveImage($base64Image)
    {
        // Split the base64 string into image type and data
        $imageParts = explode(';', $base64Image);
        $imageType = explode('/', $imageParts[0])[1];
        $imageData = base64_decode(explode(',', $imageParts[1])[1]);
        
        // Generate a unique file name with the correct extension
        $fileName = Str::uuid() . '.' . $imageType;
        $filePath = 'images/' . $fileName;
        
        // Save the image to storage
        Storage::disk('public')->put($filePath, $imageData);
        
        return $filePath;
    }

    public function saveFile($base64String)
    {
        // Remove the Base64 prefix and decode the file data
        $fileData = substr($base64String, strpos($base64String, ',') + 1);
        $fileData = str_replace(' ', '+', $fileData);
        $decodedFile = base64_decode($fileData);

        if ($decodedFile === false) {
            throw new \Exception("Failed to decode Base64 file.");
        }

        // Detect MIME type and set the appropriate file extension
        $mimeType = (new \finfo(FILEINFO_MIME_TYPE))->buffer($decodedFile);
        $mimeToExtension = [
            'application/pdf' => 'pdf',
            'application/msword' => 'doc',
            'application/vnd.ms-excel' => 'xls',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        ];

        if (!isset($mimeToExtension[$mimeType])) {
            throw new \Exception("Unsupported file type: " . $mimeType);
        }

        $extension = $mimeToExtension[$mimeType];
        $fileName = Str::random(40) . '.' . $extension;
        $filePath = 'uploads/' . $fileName;

        // Ensure the folder exists
        if (!Storage::disk('public')->exists('uploads')) {
            Storage::disk('public')->makeDirectory('uploads');
        }

        // Save the file to disk
        Storage::disk('public')->put($filePath, $decodedFile);
        return $filePath;
    }

    public function deleteFile($filePath)
    {
        if (is_string($filePath) && !empty($filePath) && Storage::disk('public')->exists($filePath)) {
            // Delete the file
            Storage::disk('public')->delete($filePath);
            return true;
        }
        return false;  // Return false if $filePath is not valid or the file doesn't exist
    }
    
}
