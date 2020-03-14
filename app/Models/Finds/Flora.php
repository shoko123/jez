<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Flora extends Model
{
    protected $table = 'flora';
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
