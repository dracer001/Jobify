<?php

use App\Models\Tag;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\InterestController;


// Routes requiring user authentication
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/work/all', [WorkController::class, 'all']);
    Route::get('/work/work_id_by_user/{work}', [WorkController::class, 'work_id_by_user']);
    Route::get('/work/recommend', [WorkController::class, 'recomendation']);
    Route::get('/work/associate', [WorkController::class, 'user_work_associate']);
    Route::post('/work/add_request', [WorkController::class, 'add_request_work']);

    // api resources for work
    Route::apiResource('work', WorkController::class);
    
    // User-related routes
    Route::prefix('user')->group(function () {
        Route::controller(UserController::class)->group(function () {
                        // returns user information
            Route::get('/', 'index');
            Route::get('/all', 'all');           // Match /api/user/all
            Route::patch('/update', 'update');   // Match /api/user/update
            Route::delete('/delete', 'destroy');  // Match /api/user/delete
            Route::get('/{user}', 'show');       // Match /api/user/{user}
            Route::get('/billing_info', 'billing_info');       // Match /api/user/{user}
            Route::get('/top_users/{limit?}', 'getTopUsers');
            Route::get('/activities/{limit?}', 'getUserActivities');

        });
    });

});



Route::get('/interests', [InterestController::class, 'index']);
Route::post('/check-email', [AuthController::class, 'checkEmail']);

Route::get('/categories', function () {
    // Fetch the categories and return only the id and name fields
    $categories = Category::select('id', 'name')->get();

    return response()->json($categories);
});

Route::get('/tags', function () {
    // Fetch the categories and return only the id and name fields
    $tags = Tag::select('id', 'name')->get();

    return response()->json($tags);
});


// Authentication controller routes
Route::prefix('auth')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/signup', 'signup')->middleware('store_activity:signup');
        Route::post('/signin', 'signin')->middleware(['store_activity:signin', 'store_notification:signin,your account was sign in at']);
        Route::post('/signout', 'signout')->middleware(['auth:sanctum', 'store_activity:signout']);
    });
});

// middleware('store.activity:signup,User has signed up.');
