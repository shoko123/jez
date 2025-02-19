<?php

namespace App\Services\App\Module\Specific\Area;

use Illuminate\Database\Eloquent\Collection;

use App\Models\Module\DigModuleModel;
use App\Services\App\BaseService;
use App\Services\App\Utils\GetService;
use App\Services\App\Utils\FormatDbResult;

class AreaRelated extends BaseService
{
    static DigModuleModel $locus;

    public static function relatedModules(string $id)
    {
        static::$locus = GetService::getModel('Locus', true);
        $res = static::accessDb($id);
        return static::formatResponse($res);
    }

    private static function accessDb(string $id): Collection
    {
        return static::$locus->with([
            'media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
        ])
            ->where('area_id', $id)
            ->get();
    }

    private static function formatResponse($recs): array
    {
        return FormatDbResult::transformArrayOfItems('Has Locus', 'Locus', $recs);
    }
}
