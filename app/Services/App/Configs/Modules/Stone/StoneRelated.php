<?php

namespace App\Services\App\Configs\Modules\Stone;

use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;

class StoneRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        return CommonToFinds::getRelated($m, $relatedPageView, $relatedPageLength);
    }
}
