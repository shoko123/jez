<?php

namespace App\Http\Requests\Media;

use App\Http\Requests\Module\BaseRequest;

class MediaReorderRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return $this->user('sanctum')->can($this->input('module') . '-media');
    }

    public function rules(): array
    {
        return [
            'module' => $this->rule_module_name_is_valid(),
            'module_id' => $this->rule_id_exists_in_module_table($this->model),
            'ordered_media_ids.*' => 'nullable|exists:media,id',
        ];
    }
}
