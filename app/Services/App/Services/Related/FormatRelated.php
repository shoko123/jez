<?php

namespace App\Services\App\Services\Related;

use Illuminate\Database\Eloquent\Collection;
use App\Services\App\Services\MediaService;
use App\Services\App\Configs\_mechanics\ModuleConfig;

class FormatRelated
{
    public static function transformOneItem(string $relation_name, string $module, object $rec): array
    {
        $cfg = new ModuleConfig($module);

        $item = [
            'relation_name' => $relation_name,
            'module' => $module,
            'id' => $rec->id,
            'short' => $cfg->shortFormat($rec),
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
