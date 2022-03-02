<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShowRequest extends FormRequest
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
            //'module' => [Rule::in(['Area', 'Season', 'AreaSeason', 'Locus', 'Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'module' => 'required|in:"Area","Season",AreaSeason,Locus,Pottery,Lithic,Stone,Glass,Metal,Fauna,Flora,Tbd',
            'area' => 'in:K,L,M,N,P,Q,S|nullable',
            'season' => 'numeric|min:12|max:18|nullable',
            'locus_no' => 'numeric|min:0|max:999|nullable',
            'registration_category' => 'in:AR,PT,GS,LB,FL|nullable',
            'basket_no' => 'numeric|min:0|max:99|nullable',
            'artifact_no' => 'numeric|min:0|max:99|nullable',
        ];
    }
}
