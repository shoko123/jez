<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PotteryStoreRequest extends FormRequest
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
            'item.id' => 'numeric|min:1|nullable',
            'item.base_type_id' => 'numeric|min:1|max:50',
            'item.description' => 'max:500',
            'item.periods' => 'max:500',
        ];
    }
}