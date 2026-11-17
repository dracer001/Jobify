<?php

use App\Enums\BankAccountType;
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
        Schema::create('billing_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Credit Card Information (for user payments - debit)
            $table->string('credit_card_number')->nullable(); // Masked card number (last 4 digits)
            $table->string('credit_card_expiry_date')->nullable(); // Card expiry date
            $table->string('credit_card_cvv')->nullable(); // Card expiry date
            $table->string('credit_card_cardholder_name')->nullable(); // Cardholder's name
            
            // Bank Account Information (for user earnings - credit)
            $table->string('bank_account_number')->nullable(); // Bank account number for credits
            $table->string('bank_account_name')->nullable(); // Account holder's name for credits
            $table->string('bank_name')->nullable(); // Name of the bank for credits
            $table->string('swift_code')->nullable(); // SWIFT code for international transfers (optional)
            $table->enum('bank_account_type', BankAccountType::getValues())->nullable();   // Type of account (checking, savings, etc.)

            $table->timestamps();
        
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_information');
    }
};
