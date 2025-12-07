<?php

namespace App\Services\App\Configs;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Module\DigModuleModel;

interface ModuleConfigInterface
{
    public static function relatedTables(): array;
    public static function fieldsMeta(): array;
    public static function validateItem(array $m): array;
    public static function idTagShortMedia1Query(DigModuleModel $m): Builder;
    public static function indexQuery(DigModuleModel $m): Builder;
    public static function applyCategorizedFilters(Builder $builder, array $groups): Builder;

    public static function orderByDefs(): array;

    public static function tagQuery(DigModuleModel $m): Builder;
    public static function tagFormat(DigModuleModel $model): string;

    public static function shortFormat(DigModuleModel $m): string;

    public static function tabularPageQuery(DigModuleModel $m): Builder;
    public static function tabularPageFormat(DigModuleModel $r): array;

    public static function showQuery(DigModuleModel $m): Builder;
    public static function showFormat(DigModuleModel $m, int $mediaPageLength): array;

    // Trio groups definitions
    public static function groups(): array;
    public static function validations(): array;
}
