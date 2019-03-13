<?php

namespace App\Models\Finds\Stone;
use App\Models\Finds\Find;

use Illuminate\Database\Eloquent\Model;

class Flint extends Model
{
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }
}
