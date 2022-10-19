<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest {
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
            'exp' => 'required|integer',
            'time_limit' => 'nullable|date',
            'severity' => 'required|integer',
            'status' => 'required|integer',
            'user_id' => 'required|integer|unique:users',
            'order_user_id' => 'nullable|integer|unique:users',
        ];
    }
}
