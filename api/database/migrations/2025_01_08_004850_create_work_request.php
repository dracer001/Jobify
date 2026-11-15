<?php

use App\Enums\WorkRequestType;
use App\Enums\WorkRequestStatus;
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
        Schema::create('work_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // User making the request
            $table->foreignId('work_id')->constrained('works')->onDelete('cascade'); // Job being requested
            $table->enum('status', WorkRequestStatus::getValues())->default(WorkRequestStatus::InProgress); // Status of the request (e.g., pending, accepted, rejected)
            $table->enum('type', WorkRequestType::getValues()); // Status of the request (e.g., pending, accepted, rejected)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_requests');
    }
};
