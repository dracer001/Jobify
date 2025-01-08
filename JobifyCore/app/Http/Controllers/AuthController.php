<?php

namespace App\Http\Controllers;

use TCPDF;
use App\Models\User;

use App\Models\Interest;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\IOFactory;
use Facades\App\Services\ActivityService;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Facades\App\Services\FileService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Intervention\Image\ImageManagerStatic as Image;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        try {
            // Handle File Upload (profile photo and credentials)
            $data["profile_photo"] = $data["profile_photo"] ? FileService::saveImage($data["profile_photo"]) : null;
            $data["credential"] = $data["credential"] ? FileService::saveFile($data["credential"]) : null;
            
            $data['password'] = Hash::make($request->password);

            $data['user_type'] = $data['reg_type'];
            // Create User
            $user = User::create($data);

            // Attach Interests
            if ($request->has('interests') && count($request->interests)) {
                $user->interests()->sync($request->interests); // Sync the selected interests
            }
            
            $token = $user->createToken('main')->plainTextToken;

            ActivityService::store($user, "signup");

            // Return response
            return response()->json([
                'message' => 'Registration successful!',
                'token' => $token
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'There was an error processing your registration.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function signin(SigninRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember_me'] ?? false;
        unset($credentials['remember_me']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json([
                'error' => 'Invalid email or password'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'token' => $token
        ], 200);
    }


    public function signout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true
        ]);
    }


    public function checkEmail(Request $request)
    {
        // Validate the email
        $request->validate([
            'email' => 'required|email',
        ]);

        // Check if the email exists in the database
        $emailExists = User::where('email', $request->email)->exists();

        if ($emailExists) {
            return response()->json(['message' => 'Email already exists.'], 400);
        }

        return response()->json(['message' => 'Email is available.'], 200);
    }

}
