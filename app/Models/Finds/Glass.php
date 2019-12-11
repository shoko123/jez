<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Glass extends Model
{
    protected $table = 'glasses';
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
