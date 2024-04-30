<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required|string',
//            'receiver_id' => 'nullable|integer|exists:users,id',
            'group_id' => 'nullable|required_without:chat_id|integer|exists:groups,id',
            'chat_id' => 'nullable|required_without:group_id|integer|exists:chats,id',
        ];
    }
}
