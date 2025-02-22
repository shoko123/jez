<?php

namespace App\Services\App\Services\Utils;

use Illuminate\Database\Eloquent\Model;

use App\Services\App\GetService;
use App\Services\App\Services\Utils\BaseService;
use App\Services\App\Services\Utils\RelatedFormat;
use App\Models\Module\DigModuleModel;

class LocusRelated extends BaseService
{
    static DigModuleModel $locus;

    public static function relatedModules(string $id)
    {
        $res = static::accessDb($id);
        return static::formatResponse($res);
    }

    private static function accessDb(string $id): Model
    {
        static::$locus = GetService::getModel('Locus', true);

        return static::$locus->with([
            'area.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'season.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'ceramics.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'fauna.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'glass.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'lithics.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'metals.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'stones.media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
        ])
            ->findOrfail($id);
    }

    private static function formatResponse($res): array
    {
        $formatted = [];

        $small = ['ceramics' => 'Ceramic', 'stones' => 'Stone',  'lithics' => 'Lithic', 'fauna' => 'Fauna', 'glass' => 'Glass', 'metals' => 'Metal'];
        foreach ($small as $key => $val) {
            $list = RelatedFormat::transformArrayOfItems('Has Find', $val, $res->$key);
            $formatted = array_merge($formatted, $list);
        }

        $area_season = [
            RelatedFormat::transformOneItem('Belongs To', 'Area', $res->area),
            RelatedFormat::transformOneItem('Belongs To', 'Season', $res->season),
        ];
        return array_merge($formatted, $area_season);
    }
}
