<?php

namespace App\Services\App\Services\Page;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use App\Services\App\Services\ModuleService;
use App\Models\Module\DigModuleModel;

class PageMainService extends ModuleService
{
    protected DigModuleModel $model;
    protected Builder $builder;

    public function __construct(string $module)
    {
        parent::__construct($module);
    }

    public function page(array $ids, string $view): array
    {
        switch ($view) {
            case 'Tabular':
                $this->buildTabularQuery();
                break;

            case 'Gallery':
                $this->buildGalleryQuery();
                break;

            case 'Chips':
                $this->buildChipQuery();
                break;
        }

        // Limit to given ids
        $this->builder = $this->builder->whereIn('id', $ids);

        //order by given ids
        $sortedIds = "'" . implode("', '", $ids) . "'";
        $this->builder->orderByRaw("FIELD(id, {$sortedIds})");

        // Retreive results from DB 
        $res = $this->builder->get();

        switch ($view) {
            case 'Tabular':
                return $this->formatTabularResult($res)->toArray();

            case 'Gallery':
                return $this->formatGalleryResult($res)->toArray();

            case 'Chips':
                return $this->formatChipResult($res)->toArray();

            default:
                return [];
        }
    }

    // Tabular
    public function buildTabularQuery()
    {
        $this->builder = $this->cfg->tabularPageQuery($this->model);
    }

    public function formatTabularResult(Collection $res)
    {
        return $res->map(function ($rec) {
            return $this->cfg->tabularPageFormat($rec);
        });
    }

    // Gallery
    public function buildGalleryQuery()
    {
        $this->builder = $this->cfg->idTagShortMedia1Query($this->model);
    }

    public function formatGalleryResult(Collection $res)
    {
        return $res->map(function ($rec) {
            return static::idTagShortMedia1Format($rec);
        });
    }

    // Chip
    public function buildChipQuery()
    {
        $this->builder = $this->cfg->tagQuery($this->model);
    }

    public function formatChipResult(Collection $res)
    {
        return $res->map(function (object $m) {
            return [
                'id' => $m->id,
                'tag' => $this->cfg->tagFormat($m)
            ];
        });
    }
}
