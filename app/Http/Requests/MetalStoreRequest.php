<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MetalStoreRequest extends FormRequest
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
            'item.material_id' =>  'exists:metal_materials,id',
            'item.base_type_id' => 'exists:metal_base_types,id',
            'item.description' => 'max:500',
            'item.measurements' => 'max:200',
        ];
    }
}