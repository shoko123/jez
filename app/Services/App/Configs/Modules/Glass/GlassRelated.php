<?php

namespace App\Services\App\Configs\Modules\Glass;

use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;

class GlassRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        return CommonToFinds::getRelated($m, $relatedPageView, $relatedPageLength);
    }
}
