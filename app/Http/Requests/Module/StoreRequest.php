<?php

namespace App\Http\Requests\Module;

use App\Http\Requests\ModuleRequest;

class StoreRequest extends ModuleRequest
{
    public function authorize(): bool
    {
        return $this->user('sanctum')->can($this->input('module') . '-' . ($this->isMethod('post') ? 'create' : 'update'));
    }

    public function rules(): array
    {
        return array_merge(
            [
                'module' => $this->rule_module_name_is_valid(),
            ],
            $this->format_store_rules($this->isMethod('post'))
        );
    }
}
