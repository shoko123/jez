<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;
use App\Services\App\Configs\ModuleConfigInterface;
use App\Models\Module\DigModuleModel;
use App\Services\App\Configs\ModulesConfig;

class ModuleConfig
{
    protected  ModuleConfigInterface $configs;
    protected  string $module;
    protected  string $relatedPath;

    public function __construct($module)
    {
        $configPath = 'App\Services\App\Configs\Modules\\' . $module . '\\' . $module .  'Config';
        $this->relatedPath = 'App\Services\App\Configs\Modules\\' . $module . '\\' . $module .  'Related';
        $this->configs = new $configPath;
        $this->module = $module;
    }

    public function module()
    {
        return $this->module;
    }

    public function tableName()
    {
        return ModulesConfig::modules()[$this->module];
    }

    public function tagsTableName(): string | null
    {
        return $this->configs->relatedTables()['tags'];
    }

    public function onpsTableName(): string | null
    {
        return $this->configs->relatedTables()['onps'];
    }

    // To be defined by each module
    public function fieldsMeta(): array
    {
        return $this->configs->fieldsMeta();
    }

    public function validateItem(array $m): array
    {
        return $this->configs->validateItem($m);
    }

    // Trio groups definitions
    public function groups(): array
    {
        return $this->configs->groups();
    }

    public function indexQuery(DigModuleModel $m): Builder
    {
        return $this->configs->indexQuery($m);
    }

    public function applyCategorizedFilters(Builder $builder, array $groups): Builder
    {
        return $this->configs->applyCategorizedFilters($builder, $groups);
    }

    public function idTagShortMedia1Query(DigModuleModel $m): Builder
    {
        return $this->configs->idTagShortMedia1Query($m);
    }

    public function idTagShortMedia1Format(DigModuleModel $m): array
    {
        return $this->idTagShortMedia1Format($m);
    }

    public function tagQuery(DigModuleModel $m): Builder
    {
        return $this->configs->indexQuery($m);
    }

    public function tagFormat(DigModuleModel $m): string
    {
        return $this->configs->tagFormat($m);
    }

    public function shortFormat(DigModuleModel $m): string
    {
        return $this->configs->shortFormat($m);
    }

    public function tabularPageQuery(DigModuleModel $m): Builder
    {
        return $this->configs->tabularPageQuery($m);
    }

    public function tabularPageFormat(DigModuleModel $m): array
    {
        return $this->configs->tabularPageFormat($m);
    }

    public function showQuery(DigModuleModel $m): Builder
    {
        return $this->configs->showQuery($m);
    }

    public function showFormat(DigModuleModel $m, int $mediaPageLength): array
    {
        return $this->configs->showFormat($m, $mediaPageLength);
    }

    public function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        $related = new $this->relatedPath;
        return $related->getRelated($m, $relatedPageView, $relatedPageLength);
    }

    public function orderByDefs(): array
    {
        return $this->configs->orderByDefs();
    }

    public function orderByOptions(): array
    {
        return array_keys($this->configs->orderByDefs()['options']);
    }

    public function allowedSearchFields(): array
    {
        return $this->configs->validations()['searchFields'];
    }

    public function allowedCategorizedFilterGroups(): array
    {
        return $this->configs->validations()['categorizedGroups'];
    }

    public function allowedDiscreteFilters(): array
    {
        return $this->configs->validations()['discreteFilterGroups'];
    }
}
