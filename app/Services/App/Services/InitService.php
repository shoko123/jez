<?php

namespace App\Services\App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use App\Services\App\GetService;
use App\Services\App\Interfaces\InitDetailsInterface;
use App\Services\App\Interfaces\ConfigInterface;
use App\Services\App\Services\Utils\BaseService;
use App\Services\App\Configs\Common\CommonInitGroups;
use App\Models\Tag\TagGroup;
use App\Exceptions\GeneralJsonException;

class InitService extends BaseService
{
    protected Model $moduleTagGroup;
    protected static InitDetailsInterface $initDetails;
    protected static ConfigInterface $moduleConfigs;

    public function __construct(string $module)
    {
        parent::__construct($module);
        if ($this->uses_module_tags()) {
            $this->moduleTagGroup = GetService::getTagGroupModel($module);
        }
        static::$initDetails = GetService::getInitDetails($module);
        static::$moduleConfigs = GetService::getConfigs($module);
    }

    public function init(): array
    {
        return [
            'module' => self::$module,
            'welcome_text' => static::$initDetails::welcomeText(),
            'counts' => [
                'items' => $this->model->count(),
                'media' => Media::where('model_type', class_basename($this->model))->count(),
            ],
            'display_options' => static::$initDetails::displayOptions(),
            'first_id' => $this->model->select('id')->firstOrFail()['id'],
            'specialFields' => static::$moduleConfigs::specialFields(),
            'trio' => $this->trio(),
        ];
    }

    protected function allGroups(): array
    {
        return array_merge(CommonInitGroups::groups(), static::$moduleConfigs::groups());
    }

    public function trio(): array
    {
        $trio = [];

        foreach (static::$initDetails::categories() as $name => $labels) {
            $category = ['name' => $name, 'groups' => []];
            foreach ($labels as $label) {
                array_push($category['groups'], array_merge(['label' => $label], $this->getGroupDetails($label)));
            }
            array_push($trio, $category);
        }
        return $trio;
    }

    public function getGroupDetails($label): array
    {
        $group = $this->allGroups()[$label] ?? null;
        throw_if(is_null($group), new GeneralJsonException('***MODEL INIT() ERROR*** getGroupDetails() invalid label: ' . $label, 500));

        switch ($group['code']) {
            case 'TG': // global tags
                return $this->getGlobalTagsGroupDetails($label, $group);

            case 'TM': // module tags
                return $this->getModelTagsGroupDetails($label, $group);

            case 'ON': // optional numeric properties
                return $this->getOptionalNumericPropertyGroupDetails($label, $group);

            case 'EM':  // enum columns
                return $this->getEnumGroupDetails($group);

            case 'LV': // lookup values 
                return $this->getLookupFieldGroupDetails($group);

            case 'RV':  // restricted value lists;
                // they often belong to a different module.
                // e.g. to filter Stone by area we use the area restricted values list
                return $this->getRestrictedValuesGroupDetails($label, $group);

            case 'CT': //categorized group
                return $this->getCategorizedGroupDetails($group);

            case 'SF': //field search
            case 'MD': //media
                return $group;

            case 'OB': // order by values 
                return $this->getOrderByGroupDetails($group);

            default:
                throw new GeneralJsonException('***MODEL INIT() ERROR*** getGroupDetails() invalid code: ' . $group['code'], 500);
        }
    }

    private function getModelTagsGroupDetails($label, $group)
    {
        $tg = $this->moduleTagGroup->with(['tags' => function ($q) {
            $q->select('id', 'name', 'tag_group_id');
        }])
            ->select('id', 'multiple')
            ->where('name', $label)
            ->first();

        throw_if(is_null($tg), new GeneralJsonException('** MODEL INIT ERROR - Group "' . $label . '" not found in module.tag_groups table ***', 500));

        unset($group['tag_group_id']);

        return array_merge(
            $group,
            [
                'options' => $tg->tags->map(function ($y) {
                    return [
                        'label' => $y->name,
                        'tag_id' => $y->id,
                    ];
                })
            ]
        );
    }

    private function getGlobalTagsGroupDetails($label, $group)
    {
        $gtg = TagGroup::with(['tags' => function ($q) {
            $q->select('id', 'name', 'tag_group_id');
        }])
            ->select('id', 'name')
            ->where('name', $label)
            ->first();

        $group['multiple'] = true;

        return array_merge($group, [
            'options' => $gtg->tags->map(function ($y) {
                return [
                    'label' => $y->name,
                    'tag_id' => $y->id,
                ];
            }),
        ]);
    }

    private function getOptionalNumericPropertyGroupDetails($label, $group)
    {
        $onpName = get_class($this->model) . 'Onp';
        $onpModel = new $onpName;
        $onpGroup = $onpModel
            ->where($group['field_name'], $group['group_name'])
            ->get();

        throw_if(is_null($onpGroup), new GeneralJsonException('** MODEL INIT ERROR - Group "' . $label . '" not found in module.onps table ***', 500));

        unset($group['group_name']);
        return array_merge($group, [
            'options' => $onpGroup->map(function ($y) {
                return [
                    'label' => $y->label,
                    'onp_id' => $y->id,
                    'shift' => $y->shift,
                ];
            }),
        ]);
    }

    private function getEnumGroupDetails($group)
    {
        $vals = self::getEnumValues(self::$tableName, $group['field_name']);
        $options = array();

        foreach ($vals as $i => $value) {
            array_push($options, ['label' => $value, 'index' => $i + 1]);
        }

        return array_merge(
            $group,
            ['options' => $options]
        );
    }

    protected static function getEnumValues($table, $column)
    {
        $expression = DB::raw("SHOW COLUMNS FROM $table WHERE Field = '$column'");
        $string = $expression->getValue(DB::connection()->getQueryGrammar());
        $type = DB::select($string)[0]->Type;

        preg_match('/^enum\((.*)\)$/', $type, $matches);
        $enum = [];
        foreach (explode(',', $matches[1]) as $value) {
            $v = trim($value, "'");
            array_push($enum, $v);
        }
        return $enum;
    }

    private function getLookupFieldGroupDetails($group)
    {
        $options = DB::table($group['lookup_table_name'])->get();
        $text_field = $group['lookup_text_field'];

        unset($group['lookup_table_name']);
        unset($group['lookup_text_field']); // May or may not exist!

        return array_merge(
            $group,
            ['options' => $options->map(function ($y, $key) use ($text_field) {
                return ['label' => $y->$text_field, 'id' => $y->id];
            })]
        );
    }

    private function getRestrictedValuesGroupDetails($label, $group)
    {
        $model = GetService::getModel($group['values_source_module']);

        throw_if(!method_exists($model, 'restricted_values'), new GeneralJsonException('** Init of RV group ' . $label . 'failed! restricted_values() not defined on' . $group['values_source_module'] . '.', 500));

        $resVals =  $model::restricted_values();
        $specific = $resVals[$group['values_source_field']];
        $manipulator = array_key_exists('manipulator', $specific) ? $specific['manipulator'] : function ($val) {
            return $val;
        };

        $mapFunc = function ($y) use ($manipulator) {
            return ['label' => $manipulator($y), 'id' => $y];
        };

        $options = array_map($mapFunc, $specific['vals']);

        unset($group['values_source_module']);
        unset($group['values_source_field']);

        return array_merge(
            $group,
            [
                'dependency' => [],
                'options' => $options,
            ]
        );
    }

    private function getCategorizedGroupDetails($group)
    {
        $mapFunc = function ($v, $k) {
            return ['label' => $v, 'index' => $k];
        };

        $options = array_map($mapFunc, $group['option_labels'], array_keys($group['option_labels']));
        unset($group['option_labels']);
        return array_merge($group, ['options' => $options]);
    }

    private function getOrderByGroupDetails($group)
    {
        return array_merge($group, ['options' => array_keys($group['options'])]);
    }
}
