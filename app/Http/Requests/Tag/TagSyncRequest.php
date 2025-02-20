<?php

namespace App\Http\Requests\Tag;

use App\Http\Requests\BaseRequest;
use App\Rules\RuleStringIntOrBool;

class TagSyncRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return $this->user('sanctum')->can($this->input('module') . '-tag');
    }

    public function rules(): array
    {
        return [
            'module' => $this->rule_module_name_is_valid(),
            'module_id' => $this->rule_id_exists_in_module_table($this->model),
            'module_tag_ids' => 'array',
            'module_tag_ids.*' => $this->rule_id_exists_in_module_tags_table($this->model),
            'global_tag_ids' => 'array',
            'global_tag_ids.*' => 'exists:tags,id',
            'fields' => ['array'],
            'fields.*.field_name' => ['required', $this->rule_tagger_field_name_is_valid()],
            'fields.*.val' => ['required', new RuleStringIntOrBool],
        ];
    }
}
