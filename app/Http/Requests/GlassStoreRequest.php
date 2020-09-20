<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GlassStoreRequest extends FormRequest
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
            'item.base_type_id' => 'numeric|min:1|max:7',
            'item.description' => 'max:500',
            'item.rim_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.base_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.bangle_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.bead_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.pontil_diameter' => 'numeric|min:1|max:50000|nullable',
        ];
    }
}