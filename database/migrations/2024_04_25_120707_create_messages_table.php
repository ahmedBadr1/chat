<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->longText('content')->nullable();
            $table->foreignIdFor(\App\Models\User::class,'sender_id');
            $table->foreignIdFor(\App\Models\User::class,'receiver_id')->nullable();
            $table->foreignIdFor(\App\Models\Group::class)->nullable();
            $table->foreignIdFor(\App\Models\Chat::class)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('groups', function (Blueprint $table) {
            $table->foreignId('last_message_id')->nullable()->constrained('messages');
        });
        Schema::table('chats', function (Blueprint $table) {
            $table->foreignId('last_message_id')->nullable()->constrained('messages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
