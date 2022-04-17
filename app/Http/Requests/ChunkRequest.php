<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChunkRequest extends FormRequest
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
            'module' => 'required|in:Area,Season,AreaSeason,Locus,Pottery,Lithic,Stone,Glass,Metal,Fauna,Flora,Tbd',
            'chunkType' => 'required|in:Media,Table',
            'ids' => 'required|array|max:200',
        ];
    }
}
