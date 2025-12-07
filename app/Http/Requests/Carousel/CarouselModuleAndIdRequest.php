<?php

namespace App\Http\Requests\Carousel;

use App\Http\Requests\ModuleRequest;

class CarouselModuleAndIdRequest extends ModuleRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'module' => $this->rule_module_name_is_valid(),
            'id' => [$this->rule_id_exists_in_module_table()],
        ];
    }
}
