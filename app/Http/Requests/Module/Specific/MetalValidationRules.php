<?php

namespace App\Http\Requests\Module\Specific;

class MetalValidationRules extends ValidationRules
{
    public function allowed_categorized_filter_group_names(): array
    {
        return [];
    }

    public function allowed_search_field_names(): array
    {
        return ['field_description', 'specialist_description'];
    }

    public function allowed_tagger_field_names(): array
    {
        return ['material_id', 'primary_classification_id'];
    }

    public function commonRules()
    {
        return [
            'data.fields.locus_id' => 'required|exists:loci,id',
            'data.fields.code' => 'required|in:AR',
            'data.fields.basket_no' => 'required|numeric|between:0,99',
            'data.fields.artifact_no' => 'required|numeric|between:0,99',
            'data.fields.date_retrieved' => 'date|nullable',
            'data.fields.field_description' => 'max:400',
            'data.fields.square' => 'max:20',
            'data.fields.level_top' => 'max:20',
            'data.fields.level_bottom' => 'max:20',
            //
            'data.fields.specialist_description' => 'max:400',
            'data.fields.measurements' => 'max:200',
            'data.fields.material_id' => 'required|exists:metal_materials,id',
            'data.fields.primary_classification_id' => 'required|exists:metal_primary_classifications,id',
            'data.fields.specialist' => 'required|in:Unassigned,UE Students',

        ];
    }

    public function create_rules(): array
    {
        return collect($this->commonRules())
            ->merge(['data.fields.id' => 'nullable'])
            ->toArray();
    }

    public function update_rules(): array
    {
        return  collect($this->commonRules())
            ->merge(['data.fields.id' => 'required|exists:metals,id',])
            ->toArray();
    }
}
