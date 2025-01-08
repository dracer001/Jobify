<?php

use App\Enums\Status;
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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // Category name
            $table->text('description')->nullable(); // Optional description
            $table->timestamps();
        });

        
        Schema::create('works', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('title'); // Job title
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null'); // Category foreign key
            $table->text('description'); // Detailed description of the job
            $table->foreignId('employer_id')->nullable()->constrained('users')->onDelete('set null'); // Employer, nullable foreign key
            $table->foreignId('employee_id')->nullable()->constrained('users')->onDelete('set null'); // Employee, nullable foreign key
            $table->string('image')->nullable(); // Job image, nullable
            $table->decimal('salary', 10, 2)->nullable(); // Minimum salary, nullable
            $table->enum('status', Status::getValues())->default(Status::Pending->value); // Job status as an enum
            $table->enum('employee_payment_status', Status::getValues())->default(Status::Pending->value)->nullable(); // Employee payment status as an enum
            $table->enum('employer_payment_status', Status::getValues())->default(Status::Pending->value); // Employer payment status as an enum
            $table->string('employee_payment_id')->nullable(); // Nullable if no payment ID yet
            $table->string('employer_payment_id')->nullable(); // Nullable if no payment ID yet
            $table->timestamps();
        });
        

        // Migration for tags table
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();  // Tag name
            $table->timestamps();
        });

        
        Schema::create('work_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('work_id')->constrained('works')->onDelete('cascade');
            $table->foreignId('tag_id')->constrained('tags')->onDelete('cascade');
            $table->timestamps();
            
            // Ensure uniqueness between work_id and tag_id
            $table->unique(['work_id', 'tag_id']);
        });
        


        

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign key constraint before dropping works table
        Schema::table('work_tag', function (Blueprint $table) {
            $table->dropForeign(['work_id']); // Drop the foreign key constraint from work_tag to works
        });

        // Drop the tables in reverse order
        Schema::dropIfExists('work_tag'); // Drop the pivot table first
        Schema::dropIfExists('tags');      // Drop tags table
        Schema::dropIfExists('works');     // Drop works table
        Schema::dropIfExists('categories'); // Drop categories table
    }
};
