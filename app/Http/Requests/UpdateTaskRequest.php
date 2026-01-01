<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title' => ['sometimes','required','string','max:255'],
            'description' => ['sometimes','nullable','string'],
            'completed' => ['sometimes','boolean'],

            // Admin only
            'user_id' => ['sometimes','integer','exists:users,id'],
        ];
    }
}
