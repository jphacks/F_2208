<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFriendRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => 'required|integer|unique:users',
            'user_id' => 'required|integer|unique:users',
            'intimacy' => 'required|integer',
            'favorite' => 'required|boolean',
            'sent_exp' => 'required|integer',
            'received_exp' => 'required|integer',
        ];
    }
}
