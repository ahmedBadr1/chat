<?php

use App\Http\Resources\ChatResource;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});

Broadcast::channel('online', function ($user) {
    return $user ? UserResource::make($user) : null;
});

Broadcast::channel('message.chat.{chatId}', function (User $user,  $chatId) {
    return $user->chats()->where('chats.id',  $chatId)->exists() || $user->chats2()->where('chats.id',  $chatId)->exists() ?  new UserResource($user) : null;
});

Broadcast::channel('message.group.{groupId}', function (User $user , $groupId) {
    return $user->groups()->where('groups.id',  $groupId)->exists() ?  new UserResource($user) : null;
});
