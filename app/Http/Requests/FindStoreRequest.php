<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FindStoreRequest extends FormRequest
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
            'find.id' => 'numeric|min:1|nullable',
            'find.locus_id' => 'required|numeric|min:1|max:2000',
            'find.registration_category' => [Rule::in(['AR', 'PT', 'GS', 'LB', 'FL'])],
            'find.findable_type' => [Rule::in(['Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'find.basket_no' => 'numeric|min:1|max:99|nullable',
            'find.artifact_no' => 'numeric|min:1|max:99|nullable',
            'find.piece_no' => 'numeric|min:1|max:99|nullable',
            'find.date' => 'date|nullable',
            'find.related_pottery_basket' => 'numeric|min:1|max:99|nullable',
            'find.square' => 'max:50|nullable',
            'find.level_top' => 'max:20|nullable',
            'find.level_bottom' => 'max:20|nullable',
            'find.keep' => 'boolean|nullable',
            'find.description' => 'max:500|nullable',
            'find.notes' => 'max:500|nullable',
        ];
    }
}
