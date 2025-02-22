<?php

namespace App\Services\App\Services\Utils;

use Illuminate\Database\Eloquent\Model;
use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\Utils\RelatedFormat;

trait SmallFindTrait
{
    static DigModuleModel $locus;

    public static function smallFindRelatedModules(string $id)
    {
        static::$locus = GetService::getModel('Locus', true);
        $res = static::accessDb($id);
        return static::formatResponse($res);
    }

    private static function accessDb(string $id): Model
    {
        return static::$locus->with([
            'media' => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
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
            'glass.media'
            => function ($query) {
                $query->orderBy('order_column')->limit(1);
            },
            'lithics.media'
            => function ($query) {
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
        $formatted = [
            RelatedFormat::transformOneItem('Belongs To', 'Locus', $res),
        ];

        $small = ['ceramics' => 'Ceramic', 'stones' => 'Stone',  'lithics' => 'Lithic', 'fauna' => 'Fauna', 'glass' => 'Glass', 'metals' => 'Metal'];
        foreach ($small as $key => $val) {
            $list = RelatedFormat::transformArrayOfItems('Locus find', $val, $res->$key);
            $formatted = array_merge($formatted, $list);
        }

        array_push($formatted, RelatedFormat::transformOneItem('Belongs To', 'Season', $res->season));
        array_push($formatted, RelatedFormat::transformOneItem('Belongs To', 'Area', $res->area));

        return $formatted;
    }

    public static function smallFindDiscreteFilterOptions(bool $withRegCode): array
    {
        $options = [
            'Season' => [
                'field' => 'locus_id',
                'start' => 1,
                'length' => 1
            ],
            'Area' => [
                'field' => 'locus_id',
                'start' => 2,
                'length' => 1
            ],
            'Registration Code' => 'code',
            'Locus Id' => 'locus_id' // This one is required by create to avoid duplicate ids.
            // It is not a part of the tag/filter system.
        ];
        if (!$withRegCode) {
            unset($options['Registration Code']);
        }
        return $options;
    }

    public static function smallFindOrderByOptions(bool $withRegCode): array
    {
        $options = [
            'Season' => [
                'field' => 'locus_id',
                'start' => 1,
                'length' => 1
            ],
            'Area' => [
                'field' => 'locus_id',
                'start' => 2,
                'length' => 1
            ],
            'Locus No.' =>            [
                'field' => 'locus_id',
                'start' => 3,
                'length' => 3
            ],
            'Registration Code' => 'code',
            'Basket No.' => 'basket_no',
            'Artifact No.' => 'artifact_no',
        ];
        if (!$withRegCode) {
            unset($options['Registration Code']);
        }
        return $options;
    }
}
