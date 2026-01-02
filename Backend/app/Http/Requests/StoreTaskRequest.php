<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'completed' => ['nullable','boolean'],

            // Admin can assign task to another user:
            'user_id' => ['nullable','integer','exists:users,id'],
        ];
    }
}
