<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Tbd extends Model
{
    public $timestamps = false;
    
    protected $guarded = [];

    public function find()
    {
        return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
