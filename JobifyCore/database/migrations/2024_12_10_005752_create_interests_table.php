<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Create interests table
        Schema::create('interests', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Sports", "Music", "Travel", etc.
            $table->timestamps();
        });

        // Create user_interests pivot table
        Schema::create('user_interests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('interest_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign key constraint before dropping works table
        Schema::table('user_interests', function (Blueprint $table) {
            $table->dropForeign(['interest_id']); // Drop the foreign key constraint from work_tag to works
        });
        // Drop the tables if they exist
        Schema::dropIfExists('interests');
        Schema::dropIfExists('user_interests');
    }
};
