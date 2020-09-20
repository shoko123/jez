<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LithicStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'item.id' => 'numeric|nullable',
            'item.base_type_id' => 'numeric|min:1|max:20',
            'item.description' => 'max:500',
            'item.width' => 'numeric|min:1|max:50000|nullable',
            'item.length' => 'numeric|min:1|max:50000|nullable',
            'item.thickness' => 'numeric|min:1|max:50000|nullable',
            'item.weight' => 'numeric|min:1|max:50000|nullable',
            'item.burnt' => 'boolean|nullable',
            'item.rolled' => 'boolean|nullable',
            'item.hinge' => 'boolean|nullable',
        ];
    }
}