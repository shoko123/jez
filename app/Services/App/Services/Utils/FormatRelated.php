<?php

namespace App\Services\App\Services\Utils;

use Illuminate\Database\Eloquent\Collection;
use App\Services\App\GetService;
use App\Services\App\Services\MediaService;

class FormatRelated
{
    public static function transformOneItem(string $relation_name, string $module, object $rec): array
    {
        $moduleConfigs = GetService::getConfigs($module);

        $item = [
            'relation_name' => $relation_name,
            'module' => $module,
            'id' => $rec->id,
            'short' => $moduleConfigs::shortFormat($rec),
            'urls' => $rec->media->isEmpty() ? null :
                MediaService::get_paths($rec->media[0])
        ];

        return $item;
    }

    public static function transformArrayOfItems(string $relation_name, string $module, Collection $recs): array
    {
        $all = [];
        foreach ($recs as $rec) {
            $one = self::transformOneItem($relation_name, $module, $rec);
            array_push($all, $one);
        }
        return $all;
    }
}
