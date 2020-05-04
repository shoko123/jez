<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoneRequest extends FormRequest
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
         /*
        $formRequests = [
            FindRequest::class,
            StoneRequest::class,
          ];
      
          $rules = [];
      
          foreach ($formRequests as $source) {
            $rules = array_merge(
              $rules,
              (new $source)->rules()
            );
          }
      
          return $rules;
          */

          //TODO work on rules: if AR - needs item_no, if GS, needs both basket_no and item_no
        return [
            'id' =>  'numeric|min:1|nullable',
            'locus_id' => 'required|numeric|min:1|max:2000',
            'registration_category' => [Rule::in(['AR', 'PT', 'GS', 'LB', 'FL'])],
            'basket_no' => 'numeric|min:0|max:99',
            'item_no' => 'numeric|min:0|max:99',
            'date' => 'date|nullable',
            'related_pottery_basket' => 'numeric|min:1|max:99|nullable',
            'square' => 'max:50',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            'keep' => 'boolean|nullable',
            'find_description' => 'max:500',
            'find_notes' => 'max:500',

            'notes' => 'max:500',
            'measurements' => 'max:500',
            'weight' => 'numeric|min:1|max:50000|nullable',           
            'length' => 'numeric|min:1|max:50000|nullable',
            'width' => 'numeric|min:1|max:50000|nullable',
            'depth' => 'numeric|min:1|max:50000|nullable',
            'thickness_min' => 'numeric|min:1|max:50000|nullable',
            'thickness_max' => 'numeric|min:1|max:50000|nullable',
            'perforation_diameter_max' => 'numeric|min:1|max:50000|nullable',
            'perforation_diameter_min' => 'numeric|min:1|max:50000|nullable',
            'perforation_depth' => 'numeric|min:1|max:50000|nullable',
            'diameter' => 'numeric|min:1|max:50000|nullable',
            'rim_diameter' => 'numeric|min:1|max:50000|nullable',
            'rim_thickness' => 'numeric|min:1|max:50000|nullable',
            'base_diameter' => 'numeric|min:1|max:50000|nullable',
            'base_thickness' => 'numeric|min:1|max:50000|nullable',
        ];
    }
}
