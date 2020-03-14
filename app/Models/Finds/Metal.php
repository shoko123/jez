<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Metal extends Model
{
    public $timestamps = false;

    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Media\Scene', 'sceneable');
    }
}
