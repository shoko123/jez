<?php

namespace App\Http\Requests\Module;

use App\Http\Requests\BaseRequest;

class StoreRequest extends BaseRequest
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
            $this->isMethod('post') ? $this->create_rules($this->model) : $this->update_rules($this->model)
        );
    }
}
