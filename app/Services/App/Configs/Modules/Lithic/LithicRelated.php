<?php

namespace App\Services\App\Configs\Modules\Lithic;

use App\Services\App\Configs\Common\CommonToFinds;
use App\Models\Module\DigModuleModel;

class LithicRelated
{
    public static function getRelated(DigModuleModel $m, string $relatedPageView, int $relatedPageLength): array
    {
        return CommonToFinds::getRelated($m, $relatedPageView, $relatedPageLength);
    }
}
