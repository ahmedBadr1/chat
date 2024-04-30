<?php

namespace App\Http\Controllers;

use App\Events\SocketMessage;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Attachment;
use App\Models\Chat;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MessagesController extends Controller
{
    public function chat(Chat $chat)
    {
        $messages = Message::where('chat_id', $chat->id)->latest('created_at')->paginate(20);
        if ($chat->user1_id  === auth()->id() ) {
            $userId = $chat->user2_id ;
        }else{
            $userId = $chat->user1_id ;
        }
        $chat->name = User::where('id', $userId)->value('name');
        $chat->is_group = 0 ;
        return inertia('Home', ['selectedChat' => $chat, 'messages' => MessageResource::collection($messages)]);
    }

    public function group(Group $group)
    {
        $messages = Message::where('group_id', $group->id)->latest('created_at')->paginate(20);
        $group->is_group = 1 ;
        return inertia('Home', ['selectedChat' => $group, 'messages' => MessageResource::collection($messages)]);
    }

    public function loadMessages(Message $message)
    {
        $query = Message::where('created_at', '<', $message->created_at);
        if ($message->group_id) {
            $query->where('group_id', $message->group_id);
        } else {
            $query->where('chat_id', $message->chat_id);
        }
        $messages = $query->latest()->paginate(20);

        return MessageResource::collection($messages);
    }

    public function store(SendMessageRequest $request)
    {
        $data = $request->validated();
        $data['sender_id'] = Auth::id();
        $chatId = $data['chat_id'] ?? null;
        $groupId = $data['group_id'] ?? null;
        $files = $request->file('attachments');

        $message = Message::create($data);

        if ($files) {
            foreach ($files as $file) {
                $dir = 'files/' . $message->id;
                Storage::disk('public')->makeDirectory($dir);
                $data = [
                    'message_id' => $message->id,
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getClientMimeType(),
                    'path' => $dir . '/' . $file->hashName()
                ];
                $attachment = Attachment::create($data);
                $attachments[] = $attachment;
            }
            $message->attachments = $attachments;
        }

        if ($chatId) {
            Chat::where('id', $data['chat_id'])->update(['last_message_id' => $message->id]);
        }

        if ($groupId) {
            Group::where('id', $data['group_id'])->update(['last_message_id' => $message->id]);
        }

        SocketMessage::dispatch($message);

        return new MessageResource($message);
    }

    public function destroy(Message $message)
    {
        if ($message->sender_id !== Auth::id()) {
            return response()->json(['message'=>'Forbidden'], 403);
        }
        $message->delete();

        return response(null, 204);
    }
}
