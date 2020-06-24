<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Fauna extends Model
{
    public $timestamps = false;    
    protected $table = 'fauna';
 
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }
}
