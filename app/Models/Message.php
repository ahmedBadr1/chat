<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['content','sender_id','receiver_id','group_id','chat_id'];

    public function sender() : BelongsTo
    {
        return  $this->belongsTo(User::class,'sender_id');
    }

    public function receiver() : BelongsTo
    {
        return  $this->belongsTo(User::class,'receiver_id');
    }
    public function group() : BelongsTo
    {
        return  $this->belongsTo(Group::class);
    }

    public function chat() : BelongsTo
    {
        return  $this->belongsTo(Chat::class);
    }

    public function attachments() : HasMany
    {
        return $this->hasMany(Attachment::class);
    }

    public function emojis() :BelongsToMany
    {
        return $this->belongsToMany(Emoji::class,'emojiables');
    }
}
