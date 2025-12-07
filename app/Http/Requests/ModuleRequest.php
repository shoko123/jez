<?php

namespace App\Http\Requests;

use App\Exceptions\GeneralJsonException;

use App\Http\Requests\BaseRequest;
use App\Services\App\Configs\ModulesConfig;
use App\Services\App\Configs\ModuleConfig;

class ModuleRequest extends BaseRequest
{
    // **** Further authorization is done by inhereting classes! ****

    protected string $module;
    protected $cfg;

    protected function prepareForValidation(): void
    {
        //Verify that the module is valid as it used as a key for other validations using $moduleTable[] above.
        if (is_null($this->input('module'))) {
            throw new GeneralJsonException('No module name supplied!', 422);
        }

        if (! array_key_exists($this->input('module'), ModulesConfig::modules())) {
            throw new GeneralJsonException('Invalid module name: `' . $this->input('module') . '`', 422);
        }

        $this->module = $this->input('module');
        $this->cfg = new ModuleConfig($this->module);
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

    protected function rule_id_exists_in_module_table(): string
    {
        return 'exists:' . $this->cfg->tableName() . ',id';
    }

    protected function rule_id_exists_in_module_tags_table(): string
    {
        return 'exists:' . $this->cfg->tagsTableName() . ',id';
    }

    protected function rule_id_exists_in_onps_table(): string
    {
        return 'exists:' . $this->cfg->onpsTableName()  . ',id';
    }

    protected function rule_categorized_group_name_is_valid()
    {
        return 'in:' . implode(',', $this->cfg->allowedCategorizedFilterGroups());
    }

    protected function rule_search_field_name_is_valid(): string
    {
        return 'in:' . implode(',', $this->cfg->allowedSearchFields());
    }

    protected function rule_tagger_field_name_is_valid(): string
    {
        $allowedFields = [];
        foreach ($this->cfg->groups() as $k => $v) {
            if (array_key_exists('useInTagger', $v) && $v['useInTagger']) {
                array_push($allowedFields, $v['fieldOrSubfield']);
            }
        }
        return 'in:' . implode(',', $allowedFields);
    }

    protected function format_store_rules(bool $is_create): array
    {
        $fv = [];

        if ($is_create) {
            if (ModulesConfig::autoIncrementId()) {
                unset($fv['data.fields.id']);
            } else {
                $fv['data.fields.id'] = 'required|unique:' . $this->cfg->tableName() . ',id';
            }
        } else {
            $fv['data.fields.id'] = 'exists:' . $this->cfg->tableName() . ',id';
        }

        foreach ($this->cfg->fieldsMeta() as $k => $v) {
            if ($k === 'id') {
                continue;
            }
            $vstring = '';
            switch ($v[0]) {
                case 'INT':
                    $vstring = ($v[1]['nullable'] ? 'numeric|nullable|' : 'numeric|') . 'min:' . $v[1]['min'] . '|max:' . $v[1]['max'];
                    break;

                case 'STR':
                    $vstring = ($v[1]['nullable'] ? 'nullable|' : '') . 'min:' . $v[1]['min'] . '|max:' . $v[1]['max'];
                    break;

                case 'DAT':
                    $vstring = 'date' .
                        ($v[1]['nullable'] ? '|nullable' : '') .
                        (array_key_exists('min', $v[1]) ? '|after_or_equal:' . $v[1]['min'] : '') .
                        (array_key_exists('max', $v[1]) ? '|before_or_equal:' . $v[1]['max'] : '');;
                    break;

                case 'LV':
                    $vstring = 'exists:' . $this->cfg->groups()[$v[1]['groupName']]['lookup_table_name'] . ',id';
                    break;

                case 'RT':
                    $vstring = 'required';
                    break;

                case 'EM':
                    $vstring = 'required|string';
                    break;

                default:
                    $vstring = '';
            }
            $fv['data.fields.' . $k] = $vstring;
        }
        return $fv;
    }

    protected function rule_discrete_value_filter_group_name_is_valid(): string
    {
        return 'in:' . implode(',', $this->cfg->allowedDiscreteFilters());
    }

    protected function rule_order_by_option_name_is_valid(): string
    {
        return 'in:' . implode(',', $this->cfg->orderByOptions());
    }
}
