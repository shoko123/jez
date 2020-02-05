<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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

        return [
            'stone_type_id' => 'required|numeric|min:1|max:255',
            'material_id' => 'required|numeric|min:1|max:255',
            'weight' => 'numeric|min:1|max:50000',
            'stone_notes' => 'max:500',
            'measurments' => 'max:500',
            'locus_id' => 'required|numeric|min:1|max:2000',
            'registration_category' => [Rule::in(['AR', 'PT', 'ST', 'LB', 'FL'])],
            'basket_no' => 'numeric|min:1|max:99',
            'item_no' => 'numeric|min:1|max:99',
            'date' => 'date|nullable',
            'related_pottery_basket' => 'numeric|min:1|max:99',
            'square' => 'max:500',
            'description' => 'max:500',
            'notes' => 'max:500',
            'storage_location' => 'max:255',
            'keep' => 'boolean',
            'level_top' => 'max:20',
            'level_bottom' => 'max:20',
            'quantity' => 'max:10',
            'weight' => 'numeric|min:1|max:50000',
        ];
    }
}
