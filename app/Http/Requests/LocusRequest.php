<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocusRequest extends FormRequest
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
        //unique:posts|
        return [
            'area_id' => 'required|numeric|min:1|max:255',
            'locus_no' => 'required|numeric|min:0|max:999',
            'square' => 'max:20',
            'date_opened' => 'date|nullable',
            'date_closed' => 'date|nullable',
            'level_opened' => 'max:20',
            'level_closed' => 'max:20',
            'locus_above' => 'max:50',
            'locus_below' => 'max:50',
            'locus_co_existing' => 'max:50',
            'description' => 'max:20',
            'deposit' => 'max:20',
            'registration_notes' => 'max:50',
            'clean' => 'max:1',
        ];
    }
}
