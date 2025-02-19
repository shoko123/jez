<?php

namespace App\Http\Requests;

use App\Exceptions\GeneralJsonException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

use App\Models\Module\DigModuleModel;
use App\Services\App\Module\ConfigInterface;
use App\Services\App\Utils\GetService;
use App\Http\Requests\RulesTrait;

class BaseRequest extends FormRequest
{
    // **** Auth to be done by inhereting classes! ****

    use RulesTrait;
    protected DigModuleModel $model;
    private string $module;

    protected function prepareForValidation(): void
    {
        //Verify that the module is valid as it used as a key for other validations using $moduleTable[] above.
        if (is_null($this->input('module'))) {
            throw new GeneralJsonException('No module name supplied!', 422);
        }

        if (! in_array($this->input('module'), ConfigInterface::modules)) {
            throw new GeneralJsonException('Invalid module name: `' . $this->input('module') . '`', 422);
        }

        $this->module = $this->input('module');
        $this->model = GetService::getModel($this->module, true);

        // $moduleConfigs is defined in the RulesTrait
        static::$moduleConfigs = GetService::getConfigs($this->module);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return ['module' => $this->rule_module_name_is_valid()];
    }
}
