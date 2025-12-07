<?php

namespace App\Http\Requests\Page;

use App\Http\Requests\ModuleRequest;

class MediaPageRequest extends ModuleRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'ids' => ['required', 'array', 'between:1,200'],
            'ids.*' => 'exists:media,id',
        ];
    }

    public function messages(): array
    {
        return [
            'ids' => 'Page length exceeds 200.',
            'ids.*' => 'A non existing media id - `:input` - was sent to the mediaPage() endpoint.',
        ];
    }
}
