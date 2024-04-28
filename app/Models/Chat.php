<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['user1_id', 'user2_id', 'user1_block_at', 'user2_block_at','last_message_id'];

    public function casts() :array
    {
        return [
            'user1_block_at', 'user2_block_at' => 'datetime'
        ];
    }
    public function user1(): BelongsTo
    {
        return $this->belongsTo(User::class,'user1_id');
    }

    public function user2(): BelongsTo
    {
        return $this->belongsTo(User::class,'user2_id');
    }


    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function lastMessage(): BelongsTo
    {
        return  $this->belongsTo(Message::class,'last_message_id');
    }
}
