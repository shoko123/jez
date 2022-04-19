<?php

namespace App\Http\Requests;

use App\Models\Auth\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FaunaStoreRequest extends FormRequest
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
            'item.id' => 'numeric|nullable',
            'item.description' => 'max:500|nullable',
            'item.notes' => 'max:500|nullable',
            'item.taxon_L1_id' => 'exists:fauna_taxon_L1,id',
            'item.element_L1_id' => 'exists:fauna_elements_L1,id',
            'item.has_butchery_evidence' => 'boolean|nullable',
            'item.has_burning_evidence' => 'boolean|nullable',
            'item.has_other_bsm_evidence' => 'boolean|nullable',
            'item.is_fused' => 'boolean|nullable',
            'item.is_left' => 'boolean|nullable',
            'item.d_and_r' => 'max:500|nullable',
            'item.weathering' => 'numeric|max:20|nullable',
            'item.age' => 'max:50|nullable',
            'item.breakage' => 'max:500|nullable',
            'item.GL' => 'numeric|max:99|nullable',
            'item.Glpe' => 'numeric|max:99|nullable',
            'item.GLl' => 'numeric|max:99|nullable',
            'item.GLP' => 'numeric|max:99|nullable',
            'item.Bd' => 'numeric|max:99|nullable',
            'item.BT' => 'numeric|max:99|nullable',
            'item.Dd' => 'numeric|max:99|nullable',
            'item.BFd' => 'numeric|max:99|nullable',
            'item.Bp' => 'numeric|max:99|nullable',
            'item.Dp' => 'numeric|max:99|nullable',
            'item.SD' => 'numeric|max:99|nullable',
            'item.HTC' => 'numeric|max:99|nullable',
            'item.Dl' => 'numeric|max:99|nullable',
            'item.DEM' => 'numeric|max:99|nullable',
            'item.DVM' => 'numeric|max:99|nullable',
            'item.WCM' => 'numeric|max:99|nullable',
            'item.DEL' => 'numeric|max:99|nullable',
            'item.DVL' => 'numeric|max:99|nullable',
            'item.WCL' => 'numeric|max:99|nullable',
            'item.LD' => 'numeric|max:99|nullable',
            'item.DLS' => 'numeric|max:99|nullable',
            'item.LG' => 'numeric|max:99|nullable',
            'item.BG' => 'numeric|max:99|nullable',
            'item.DID' => 'numeric|max:99|nullable',
            'item.BFcr' => 'numeric|max:99|nullable',
            'item.GD' => 'numeric|max:99|nullable',
            'item.GB' => 'numeric|max:99|nullable',
            'item.BF' => 'numeric|max:99|nullable',
            'item.LF' => 'numeric|max:99|nullable',
            'item.GLm' => 'numeric|max:99|nullable',
            'item.GH' => 'numeric|max:99|nullable',
        ];
    }
}