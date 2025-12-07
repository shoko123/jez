<?php

namespace App\Http\Requests\Page;

use App\Http\Requests\BaseRequest;

class RelatedPageRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'view' => ['required', 'in:Tabular,Gallery,Chips'],
            'relations' => ['required', 'array', 'between:1,200'],
            'relations.*.relation_name' => ['required'],
            'relations.*.module' => $this->rule_module_name_is_valid(),
            'relations.*.id' => ['required'], // Add rule exists in (above) module
        ];
    }

    public function messages(): array
    {
        return [
            'ids.*' => 'A non existing id - `:input` - was sent to the page() endpoint',
            'ids' => 'page length exceeds 200',
            'view' => 'View value sent - `:input` - is not allowed',
        ];
    }
}
