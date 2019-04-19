<?php

namespace App\Models\Finds\Stone;
use App\Models\Finds\Find;
use App\Models\Image\Scene;
use Illuminate\Database\Eloquent\Relations\Relation;

use Illuminate\Database\Eloquent\Model;

class Flint extends Model
{
    public $timestamps = false;
    
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
