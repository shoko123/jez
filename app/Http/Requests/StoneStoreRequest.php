<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoneStoreRequest extends FormRequest
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
            'item.description' => 'max:500',
            'item.notes' => 'max:500',
            'item.weight' => 'numeric|min:1|max:50000|nullable',
            'item.length' => 'numeric|min:1|max:50000|nullable',
            'item.width' => 'numeric|min:1|max:50000|nullable',
            'item.depth' => 'numeric|min:1|max:50000|nullable',
            'item.thickness_min' => 'numeric|min:1|max:50000|nullable',
            'item.thickness_max' => 'numeric|min:1|max:50000|nullable',
            'item.perforation_diameter_max' => 'numeric|min:1|max:50000|nullable',
            'item.perforation_diameter_min' => 'numeric|min:1|max:50000|nullable',
            'item.perforation_depth' => 'numeric|min:1|max:50000|nullable',
            'item.diameter' => 'numeric|min:1|max:50000|nullable',
            'item.rim_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.rim_thickness' => 'numeric|min:1|max:50000|nullable',
            'item.base_diameter' => 'numeric|min:1|max:50000|nullable',
            'item.base_thickness' => 'numeric|min:1|max:50000|nullable',
        ];
    }
}
