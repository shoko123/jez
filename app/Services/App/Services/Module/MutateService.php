<?php

namespace App\Services\App\Services\Module;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Exceptions\GeneralJsonException;

use App\Services\App\Configs\ModulesConfig;
use App\Services\App\GetService;
use App\Services\App\Services\ModuleService;

class MutateService extends ModuleService
{
    public function __construct(string $module)
    {
        parent::__construct($module);
    }

    public function create(array $data)
    {
        return $this->save(true, $data['fields']);
    }

    public function update(array $data)
    {
        $this->model = $this->model
            ->findOrFail($data['fields']['id']);

        return $this->save(false, $data['fields']);
    }


    protected function save(bool $isCreate, array $new_fields)
    {
        $res = $this->cfg->validateItem($new_fields);
        if (!$res['isValid']) {
            throw new GeneralJsonException('Unable to save d/t validation error: "' . $res['messages'][0] . '"', 422);
        }

        $id = '';

        DB::transaction(function () use ($new_fields, $isCreate, &$id,) {

            // Copy fields
            foreach ($new_fields as $key => $value) {
                $this->model[$key] = $value;
            }

            $this->model->save();

            if ($isCreate && ModulesConfig::autoIncrementId()) {
                // For some reason we have to do this with autocincrement id inserts (id won't be update in $this->model).
                $id = $this->model->insertGetId($this->model->toArray());
            } else {
                $id = $this->model['id'];
            }
        });

        return ['id' => $id, 'tag' => $this->cfg->tagFormat($this->model)];
    }

    public function destroy(string $module, string $id): array
    {
        $with_arr = [];
        $usesTags = GetService::getTagGroupModel($module) !== null;

        if ($usesTags) {
            array_push($with_arr, 'module_tags');
            array_push($with_arr, 'global_tags');
        }

        if ($this->cfg->onpsTableName() !== null) {
            array_push($with_arr, 'onps');
        }

        //get item with related tags,onps
        $item = $this->model->with($with_arr)->findOrFail($id);

        DB::transaction(function () use ($item, $usesTags) {
            if ($usesTags) {
                $item->module_tags()->detach();
                $item->global_tags()->detach();
            }

            if ($this->cfg->onpsTableName() !== null) {
                $item->onps()->detach();
            }
            $item->delete();
        });

        return ["deleted_id" => $item->id];
    }
}
