<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Model;
use App\Services\App\Module\ConfigInterface;

trait RulesTrait
{
    // This member will be assigned by BaseRequest - the base class of all requests
    protected static ConfigInterface $moduleConfigs;

    protected function rule_module_name_is_valid()
    {
        return 'required|in:' .  implode(',', ConfigInterface::modules);
    }

    // Generic for all modules
    //////////////////////////
    protected function rule_id_exists_in_module_table(Model $m): string
    {
        return 'exists:' . $m->tableName() . ',id';
    }

    protected function rule_id_exists_in_module_tags_table(Model $m): string
    {
        return 'exists:' . $m->tagTableName() . ',id';
    }

    protected function rule_id_exists_in_onps_table(Model $m): string
    {
        return 'exists:' . $m->onpTableName() . ',id';
    }

    protected function rule_discrete_value_filter_group_name_is_valid(): string
    {
        $groupNames = array_keys(static::$moduleConfigs::discreteFilterOptions());
        return 'in:' . implode(',', $groupNames);
    }

    protected function rule_order_by_group_name_is_valid(): string
    {
        // Season and Area mudules don't have "Order By" options
        if (!array_key_exists('Order By', static::$moduleConfigs::groups())) {
            return '';
        }
        $orderBy = array_keys(static::$moduleConfigs::groups()['Order By']['options']);
        return 'in:' . implode(',', $orderBy);
    }

    // Module specific
    //////////////////
    protected function rule_categorized_group_name_is_valid()
    {
        return 'in:' . implode(',', static::$moduleConfigs::allowed_categorized_filter_group_names());
    }

    protected function rule_search_field_name_is_valid(): string
    {
        return 'in:' . implode(',', static::$moduleConfigs::allowed_search_field_names());
    }

    protected function rule_tagger_field_name_is_valid(): string
    {
        return 'in:' . implode(',', static::$moduleConfigs::allowed_tagger_field_names());
    }

    protected function create_rules(Model $m): array
    {
        return $this->format_fields_rules($m, true);
    }

    protected function update_rules(Model $m): array
    {
        return $this->format_fields_rules($m, false);
    }

    private  function format_fields_rules(Model $m, bool $is_create): array
    {
        $formatted = [];
        foreach (static::$moduleConfigs::fieldsValidation() as $k => $v) {
            $formatted['data.fields.' . $k] = $v;
        }
        $formatted['data.fields.id'] .= '|' . ($is_create ? 'unique' : 'exists') . ':' . $m->tableName() . ',id';

        if (!is_null(!$m->onpTableName())) {
            $formatted['data.onps'] = 'array';
            $formatted['data.onps.*.id'] = 'required|exists:' . $m->onpTableName() . ',id';
            $formatted['data.onps.*.value'] = 'required|numeric|between:1,32767';
        }
        return $formatted;
    }
}
