<?php

namespace App\Models\Module\Specific\Area;

use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Module\DigModuleModel;

class Area extends DigModuleModel
{
    protected $table = 'areas';

    public static function restricted_values(): array
    {
        return ['id' => [
            'vals' => ['K', 'L', 'M', 'N', 'P', 'Q', 'S'],
        ]];
    }

    protected function derivedId(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['id']
        );
    }
}
