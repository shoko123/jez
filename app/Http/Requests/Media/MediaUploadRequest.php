<?php

namespace App\Http\Requests\Media;

use App\Http\Requests\ModuleRequest;
use App\Services\App\Configs\MediaConfig;
use Illuminate\Validation\Rules\File;

class MediaUploadRequest extends ModuleRequest
{
    public function authorize(): bool
    {
        return $this->user('sanctum')->can($this->input('module') . '-media');
    }

    public function rules(): array
    {
        $media_collections = MediaConfig::mediaCollectionNames();
        $media_collection_rule = 'nullable|in:' . implode(',', $media_collections);

        return [
            'module' => $this->rule_module_name_is_valid(),
            'id' => $this->rule_id_exists_in_module_table(),
            'media_collection_name' => $media_collection_rule,
            'media_files.*' => [
                File::image()
                    ->min(1)
                    ->max(3 * 1024),
            ],
        ];
    }
}
