<?php

namespace App\Models\Finds\Stone\Groundstone;
use App\Models\Finds\Find;

use Illuminate\Database\Eloquent\Model;

class Groundstone extends Model
{
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }
}
