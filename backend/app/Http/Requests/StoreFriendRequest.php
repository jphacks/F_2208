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
            'id' => 'required|integer',
            'user_id' => 'required|integer',
            'intimacy' => 'integer',
            'favorite' => 'boolean',
            'sent_exp' => 'rinteger',
            'received_exp' => 'integer',
        ];
    }
}
