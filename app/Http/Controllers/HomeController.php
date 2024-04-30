<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
//        $userId = auth()->id();
//        $groups = Group::with('lastMessage')->whereHas('users', function ($query) use ($userId) {
//            $query->where('user_id', $userId);
//        })->get();
//
//        $chats = Chat::with(['user1' => fn($q) => $q->where('id', '!=', $userId), 'user2' => fn($q) => $q->where('id', '!=', $userId), 'lastMessage'])->where(function ($query) use ($userId) {
//            $query->where('user1_id', $userId)->orWhere('user2_id', $userId);
//        })->get();
//
//        $chats->map(function ($chat) {
//            $chat->name = $chat->user1->name ?? $chat->user2->name;
//            $chat->user_id = $chat->user1->id ?? $chat->user2->id;
//            return $chat;
//        });
//
//        $allChats = collect($chats)->merge($groups)->map(function ($chat) {
//            $chat->is_group = $chat instanceof Group;
//            $chat->last_message_date = $chat->lastMessage ? $chat->lastMessage->updated_at->diffForHumans() : null;
//            return $chat;
//        })->sortByDesc('lastMessage.updated_at');

        return Inertia::render('Home');
    }
}
