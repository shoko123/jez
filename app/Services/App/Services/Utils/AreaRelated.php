<?php

namespace App\Services\App\Services\Utils;

use Illuminate\Database\Eloquent\Collection;

use App\Models\Module\DigModuleModel;
use App\Services\App\Services\Utils\BaseService;
use App\Services\App\GetService;
use App\Services\App\Services\Utils\FormatRelated;

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
        return FormatRelated::transformArrayOfItems('Has Locus', 'Locus', $recs);
    }
}
