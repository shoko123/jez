<?php

//namespace App\Models\Finds\Stone\Groundstone;
use App\Models\Finds\Find;

use Illuminate\Database\Eloquent\Model;

class Groundstone extends Model
{
    public $timestamps = false;
    
    public function find()
    {
        return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('App\Models\Image\Scene', 'sceneable');
    }
}
