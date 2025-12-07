<?php

namespace App\Services\App\Services\Module;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Services\ModuleService;
use App\Models\Module\DigModuleModel;
use App\Models\Tag\Tag;

class IndexService extends ModuleService
{
    protected DigModuleModel $model;
    protected Builder $builder;

    public function __construct(string $module)
    {
        parent::__construct($module);
    }

    public function index(?array $query): array
    {
        $this->builder = $this->cfg->indexQuery($this->model);

        if (! is_null($query)) {
            $this->applyFilters($query);
        }

        if (empty($query['order_by'])) {
            $this->applyDefaultOrderBy();
        } else {
            $this->applyOrderBy($query['order_by']);
        }

        // dd('**** ' . $this->builder->toRawSql());
        $res = $this->builder->get();

        $manipulated = $res->map(function ($item, $key) {
            return $item->id;
        });

        return $manipulated->toArray();
    }

    public function applyFilters($query)
    {
        if (! empty($query['module_tag_ids'])) {
            $this->applyModelTagFilters($query['module_tag_ids']);
        }

        if (! empty($query['global_tag_ids'])) {
            $this->applyGlobalTagFilters($query['global_tag_ids']);
        }

        if (! empty($query['onp_ids'])) {
            $this->applyNumericPropertiesFilters($query['onp_ids']);
        }

        if (! empty($query['discrete_field_values'])) {
            $this->applyFieldValueFilters($query['discrete_field_values']);
        }

        if (! empty($query['categorized'])) {
            $this->builder =  $this->cfg->applyCategorizedFilters($this->builder, $query['categorized']); // $this->categorizedFilters($query['categorized']);
        }

        if (! empty($query['field_search'])) {
            $this->applyFieldSearchFilters($query['field_search']);
        }

        if (! empty($query['media'])) {
            $this->applyMediaFilter($query['media']);
        }
    }

    // Enums or Lookups
    public function applyFieldValueFilters(array $cols)
    {
        foreach ($cols as $key => $data) {
            $group = $this->cfg->groups()[$data['group_name']];
            if (is_array($group['fieldOrSubfield'])) {
                // Subfield
                $field = $group['fieldOrSubfield']['name'];
                $start = $group['fieldOrSubfield']['start'];
                $length = $group['fieldOrSubfield']['length'];

                $qry = 'SUBSTRING(' . $field . ', ' . $start . ', ' . $length . ') ' .  ' in (' .
                    rtrim(str_repeat('?,', count($data['vals'])), ',') .
                    ')';

                $this->builder->whereRaw($qry, $data['vals']);
            } else {
                // Not a subfield
                $this->builder->whereIn($group['fieldOrSubfield'], $data['vals']);
            }
        }
    }

    public function applyModelTagFilters(array $tag_ids)
    {
        $tagModelName = get_class($this->model) . 'Tag';
        $tagModel = new $tagModelName;
        $groups = [];

        $tags = $tagModel->select('id', 'tag_group_id')->whereIn('id', $tag_ids)->get();

        foreach ($tags as $tag) {
            if (array_key_exists($tag->tag_group_id, $groups)) {
                array_push($groups[$tag->tag_group_id], $tag->id);
            } else {
                $groups[$tag->tag_group_id] = [$tag->id];
            }
        }

        foreach ($groups as $type_id => $tag_ids_for_group) {
            $this->builder->whereHas('module_tags', function (Builder $q) use ($tag_ids_for_group) {
                $q->whereIn('id', $tag_ids_for_group);
            });
        }
    }

    public function applyNumericPropertiesFilters(array $onp_ids)
    {
        $onpName = get_class($this->model) . 'Onp';
        $onpModel = new $onpName;

        $groups = [];
        $onps = $onpModel->select('id', 'group_label')->whereIn('id', $onp_ids)->get();

        foreach ($onps as $onp) {
            if (array_key_exists($onp->group_label, $groups)) {
                array_push($groups[$onp->group_label], $onp->id);
            } else {
                $groups[$onp->group_label] = [$onp->id];
            }
        }

        foreach ($groups as $type_id => $onp_ids_for_group) {
            $this->builder->whereHas('onps', function (Builder $q) use ($onp_ids_for_group) {
                $q->whereIn('id', $onp_ids_for_group);
            });
        }
    }

    public function applyGlobalTagFilters(array $tag_ids)
    {
        $tags = Tag::select('id', 'tag_group_id')->whereIn('id', $tag_ids)->get();
        $groups = [];

        foreach ($tags as $tag) {
            if (array_key_exists($tag->tag_group_id, $groups)) {
                array_push($groups[$tag->tag_group_id], $tag->id);
            } else {
                $groups[$tag->tag_group_id] = [$tag->id];
            }
        }

        foreach ($groups as $type_id => $tag_ids_for_group) {
            $this->builder->whereHas('global_tags', function (Builder $q) use ($tag_ids_for_group) {
                $q->whereIn('id', $tag_ids_for_group);
            });
        }
    }

    public function applyFieldSearchFilters(array $cols)
    {
        foreach ($cols as $key => $col) {
            $this->builder->Where(function ($query) use ($col) {
                foreach ($col['vals'] as $key1 => $term) {
                    $query->orWhere($col['field_name'], 'LIKE', '%' . $term . '%');
                }
            });
        }
    }

    public function applyMediaFilter(array $collectionNames)
    {
        $this->builder->whereHas('media', function (Builder $mediaQuery) use ($collectionNames) {
            $mediaQuery->whereIn('collection_name', $collectionNames);
        });
    }

    public function applyOrderBy(array $order_by)
    {
        $orderByDefs = $this->cfg->orderByDefs();

        foreach ($order_by as $key => $def) {
            $optionName = $def['option_name'];
            $order = $def['asc'] ? 'ASC' : 'DESC';
            if ($orderByDefs['options'][$optionName]['isGroup']) {
                $group = $this->cfg->groups()[$optionName];
                $this->applyFieldOrSubOrderBy($group['fieldOrSubfield'], $order);
            } else {
                $this->applyFieldOrSubOrderBy($orderByDefs['options'][$optionName]['fieldOrSubfield'], $order);
            }
        }
    }

    public function applyDefaultOrderBy()
    {
        $orderByDefs = $this->cfg->orderByDefs();
        $combined  = array_merge($orderByDefs['options'], $orderByDefs['hiddenOptions']);
        foreach ($orderByDefs['defaults'] as $key => $order) {
            if ($combined[$key]['isGroup']) {
                $group = $this->cfg->groups()[$key];
                $this->applyFieldOrSubOrderBy($group['fieldOrSubfield'], $order);
            } else {
                $this->applyFieldOrSubOrderBy($combined[$key]['fieldOrSubfield'], $order);
            }
        }
    }

    public function applyFieldOrSubOrderBy($fieldOrSub, $order)
    {
        if (is_array($fieldOrSub)) {
            $field = $fieldOrSub['name'];
            $start = $fieldOrSub['start'];
            $length = $fieldOrSub['length'];
            $line = 'SUBSTRING(' . $field . ', ' . $start . ', ' . $length . ') ' . $order;
            $this->builder->orderByRaw($line);
        } else {
            $this->builder->orderBy($fieldOrSub, $order);
        }
    }
}
