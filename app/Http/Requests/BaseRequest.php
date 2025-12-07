<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use App\Services\App\Configs\ModulesConfig;

class BaseRequest extends FormRequest
{
    protected function rule_module_name_is_valid()
    {
        return 'required|in:' .  implode(',', array_keys(ModulesConfig::modules()));
    }
}
