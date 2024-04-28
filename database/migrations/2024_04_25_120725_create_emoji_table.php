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
        Schema::create('emoji', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->timestamps();
        });
        Schema::create('emojiables', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Emoji::class);
            $table->foreignIdFor(\App\Models\Message::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emoji');
        Schema::dropIfExists('emojiables');
    }
};
