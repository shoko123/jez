<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class Stone extends Model
{
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }
}
