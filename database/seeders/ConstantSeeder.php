<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Emoji;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConstantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'Admin',
            'email' => 'admin@chatty.com',
        ]);
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@chatty.com',
        ]);
        User::factory(10)->create();

        $users = User::pluck('id')->toArray();

        foreach ($users as $user) {
           $group = Group::factory()->create([
                'owner_id' => $user,
            ]);
            $randomUserIds = fake()->randomElements($users,rand(2,10));;
            $groupUsers = array_unique(array_merge([$user], $randomUserIds));
            $group->users()->attach($groupUsers);

            Message::factory(rand(10,50))->group($group->id,$user)->create();
            $receiver = fake()->randomElement(array_diff($users, [$user]));
            Message::factory(rand(10,50))->chat($user,$receiver)->create();
        }

//        Emoji::factory(1000)->create();

    }

    /**
     * @param $users
     * @param mixed $user
     * @return void
     */
    public function seedChatMessages($users, mixed $user): void
    {
        $receiver = fake()->randomElement(array_diff($users, [$user]));
        $chatId = Chat::where(function ($query) use ($user, $receiver) {
            $query->where('user1_id', $user)
                ->where('user2_id', $receiver);
        })->orWhere(function ($query) use ($user, $receiver) {
            $query->where('user2_id', $user)
                ->where('user1_id', $receiver);
        })->value('id');
        if (!$chatId) {
            $chatId = Chat::create([
                'user1_id' => $user,
                'user2_id' => $receiver,
            ])->id;
        }
        Message::factory(rand(2, 10))->create([
            'sender_id' => $user,
            'receiver_id' => $receiver,
            'chat_id' => $chatId,
        ]);
    }
}
