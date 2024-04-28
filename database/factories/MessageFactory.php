<?php

namespace Database\Factories;

use App\Models\Chat;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function group($groupId , $senderId)
    {
        return $this->state(fn (array $attributes) => [
            'sender_id' => $senderId,
            'group_id' => $groupId,
        ]);
    }

    public function chat($senderId,$receiverId)
    {
        $chat = Chat::where(function ($query) use ($senderId, $receiverId) {
            $query->where('user1_id', $senderId)
                ->where('user2_id', $receiverId);
        })->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('user2_id', $senderId)
                ->where('user1_id', $receiverId);
        })->first();
        if (!$chat){
            $chat = Chat::create([
                'user1_id' => $senderId,
                'user2_id' => $receiverId,
            ]);
        }
        return $this->state(fn (array $attributes) => [
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'chat_id' => $chat->id,
        ]);
    }
}
