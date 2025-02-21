<?php

namespace App\Services\App\Read;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Services\App\BaseService;
use App\Services\App\GetService;
use App\Services\App\ConfigInterface;
use App\Models\Module\DigModuleModel;
use App\Services\App\Media\MediaService;

class PageService extends BaseService
{
    protected DigModuleModel $model;
    protected Builder $builder;
    protected static ConfigInterface $moduleConfigs;

    public function __construct(string $module)
    {
        parent::__construct($module);
        static::$moduleConfigs = GetService::getConfigs($module);
    }

    public function page(array $ids, string $view): array
    {
        // Build query according to view
        if ($view === 'Tabular') {
            $this->buildTabularQuery();
        } else {
            $this->buildGalleryQuery();
        }

        // Limit to given ids
        $this->builder = $this->builder->whereIn('id', $ids);

        //order by given (string) ids
        $sortedIds = "'" . implode("', '", $ids) . "'";
        $this->builder->orderByRaw("FIELD(id, {$sortedIds})");

        // Retreive results from DB 
        $res = $this->builder->get();

        // Return formatted results
        $response = $view === 'Tabular' ? $this->formatTabularResult($res) : $this->formatGalleryResult($res);
        return $response->toArray();
    }

    // Tabular
    public function buildTabularQuery()
    {
        $queryDefs = static::$moduleConfigs::tabularPageQuery();
        $withArr = array_key_exists('with', $queryDefs) ? $queryDefs['with'] : null;

        $this->builder = $this->model
            ->select($queryDefs['select']);

        if ($withArr) {
            $this->builder = $this->builder->with($withArr);
        }
    }

    public function formatTabularResult(Collection $res)
    {
        return $res->map(function (object $rec) {
            return static::$moduleConfigs::tabularPageFormat($rec);
        });
    }

    // Gallery
    public function buildGalleryQuery()
    {

        $withArr = array_key_exists('with', self::$moduleConfigs::shortQuery()) ? self::$moduleConfigs::shortQuery()['with'] : [];

        $withArr = array_merge($withArr, ['media' => function ($query) {
            $query->orderBy('order_column')->limit(1);
        }]);

        $this->builder = $this->model
            ->with($withArr);
    }

    public function formatGalleryResult(Collection $res)
    {
        return $res->map(function ($item, $key) {
            return [
                'id' => $item['id'],
                'short' => static::$moduleConfigs::shortFormat($item),
                'urls' => $item->media->isEmpty() ? null :
                    MediaService::format_media_item($item->media[0])['urls'],
            ];
        });
    }
}
