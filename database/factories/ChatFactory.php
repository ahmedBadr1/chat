<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user1_id' =>  User::inRandomOrder()->value('id'),
            'user2_id'=> User::inRandomOrder()->value('id'),
//'user1_block_at'
//'user2_block_at'
        ];
    }
}
