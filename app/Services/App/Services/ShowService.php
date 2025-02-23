<?php

namespace App\Services\App\Services;

use Illuminate\Database\Eloquent\Builder;

use App\Services\App\Services\Utils\BaseService;
use App\Services\App\GetService;
use App\Services\App\Interfaces\ConfigInterface;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\MediaService;

class ShowService extends BaseService
{
    protected DigModuleModel $model;
    protected Builder $builder;
    protected static ConfigInterface $moduleConfigs;

    public function __construct(string $module)
    {
        parent::__construct($module);
        static::$moduleConfigs = GetService::getConfigs($module);
    }

    public function carousel_main(string $module, string $id): array
    {
        $model = GetService::getModel($module, true);
        $item = $model
            ->with(['media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            }])
            ->findOrfail($id);

        return [
            'id' => $item['id'],
            'short' => static::$moduleConfigs::shortFormat($item),
            'urls' => $item->media->isEmpty()  ? null : MediaService::get_paths($item->media[0]),
            'module' => $module,
        ];
    }

    public function show(string $id): array
    {
        $this->buildShowQuery();
        $item = $this->builder->findOrFail($id);
        $related = static::$moduleConfigs::relatedModules($id);
        return $this->formatShowResponse($item, $related);
    }

    protected function buildShowQuery(): void
    {
        $withArr = array_key_exists('with', static::$moduleConfigs::showQuery()) ? static::$moduleConfigs::showQuery()['with'] : [];
        $this->builder = $this->model->with($withArr);
    }

    protected function formatShowResponse(object $item, array $related): array
    {
        $formatted = static::$moduleConfigs::showFormat($item);
        $formatted['related'] = $related;
        return $formatted;
    }
}
