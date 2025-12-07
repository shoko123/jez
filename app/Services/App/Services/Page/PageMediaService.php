<?php

namespace App\Services\App\Services\Page;

use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use App\Models\Module\DigModuleModel;
use App\Services\App\Services\MediaService;

class PageMediaService
{
    protected DigModuleModel $model;
    protected static Builder $builder;

    public static function page(array $ids): array
    {
        // Limit to given ids
        $sortedIds = "'" . implode("', '", $ids) . "'";

        $res = Media::whereIn('id', $ids)
            ->orderByRaw("FIELD(id, {$sortedIds})")
            ->get();

        return MediaService::format_media_collection($res);
    }
}
