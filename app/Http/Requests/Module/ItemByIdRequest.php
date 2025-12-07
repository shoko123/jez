<?php

namespace App\Http\Requests\Module;

use App\Http\Requests\ModuleRequest;

class ItemByIdRequest extends ModuleRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'module' => $this->rule_module_name_is_valid(),
            'id' => ['required', $this->rule_id_exists_in_module_table()],
            'relatedPageView' => ['required', 'in:Tabular,Gallery,Chips'],
            'relatedPageLength' => ['required', 'numeric', 'between:1,500'],
            'mediaPageLength' => ['required', 'numeric', 'between:1,500'],
        ];
    }

    public function messages(): array
    {
        return [
            'id' => 'An invalid or non existing id - `:input`',
        ];
    }
}
