<?php

use App\Enums\Status;
use App\Enums\TransactionType;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // references users table
            $table->foreignId('related_user_id')->nullable()->constrained('users')->onDelete('cascade'); // references users table
            $table->string('transaction_id')->unique();
            $table->enum('transaction_type', TransactionType::getValues());
            $table->decimal('amount', 10, 2); // Amount of the transaction
            $table->enum('status', Status::getValues()); // Credit or debit
            $table->string('payment_method')->nullable(); // The method of payment (e.g., credit card, PayPal)
            $table->text('description')->nullable(); // Any relevant description for the transaction
            $table->timestamps();
        });
        
        
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
