<?php

use App\Enums\Gender;
use App\Enums\UserType;
use App\Enums\UserStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('company_name')->nullable();
            $table->string('title')->nullable();
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();
            $table->string('company_website')->nullable();
            $table->text('address')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->text('about')->nullable();
            $table->enum('gender', Gender::getValues())->default(Gender::Others->value)->nullable();
            $table->string('password');
            $table->string('profile_photo')->nullable();
            $table->string('credential')->nullable();
            $table->enum('status', UserStatus::getValues())->default(UserStatus::Active->value); // Job status as an enum
            $table->enum('user_type', UserType::getValues());
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken(); // For "remember me" functionality
            $table->timestamps(); // Created at and Updated at timestamps
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
