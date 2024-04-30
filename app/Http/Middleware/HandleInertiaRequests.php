<?php

namespace App\Http\Middleware;

use App\Models\Chat;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userId = auth()->id();
        $groups = Group::with('lastMessage')->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        $chats = Chat::with(['user1' => fn($q) => $q->where('id', '!=', $userId), 'user2' => fn($q) => $q->where('id', '!=', $userId), 'lastMessage'])->where(function ($query) use ($userId) {
            $query->where('user1_id', $userId)->orWhere('user2_id', $userId);
        })->get();

        $chats->map(function ($chat) {
            $chat->name = $chat->user1->name ?? $chat->user2->name;
            $chat->user_id = $chat->user1->id ?? $chat->user2->id;
            return $chat;
        });

        $allChats =collect($groups)->merge($chats)->map(function ($chat) {
            $chat->is_group = $chat instanceof Group;
            $chat->last_message_date = $chat->lastMessage ? $chat->lastMessage->updated_at->diffForHumans() : null;
            return $chat;
        })->sortByDesc('lastMessage.updated_at');

//        dd($allChats);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'chats' => [...$allChats],
        ];
    }
}
