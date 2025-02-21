<?php

namespace App\Models\Module\Specific\Survey;

use App\Models\Module\DigModuleModel;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Services\App\GetService;

class Survey extends DigModuleModel
{
    protected $table = 'survey';

    public function area()
    {
        return $this->belongsTo(GetService::getModel('Area'));
    }

    protected function derivedId(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['area_id'] . (string)$attributes['feature_no']
        );
    }
}
