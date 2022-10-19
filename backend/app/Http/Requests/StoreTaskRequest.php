<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules() {
        return [ 
            'title' => 'required|string',
            'description' => 'nullable|string',
            'exp' => 'integer',
            'time_limit' => 'nullable|date',
            'severity' => 'integer',
            'status' => 'integer',
            'user_id' => 'integer',
            'order_user_id' => 'nullable|integer',
        ];
    }
}
