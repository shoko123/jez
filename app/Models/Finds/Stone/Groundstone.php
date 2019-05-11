<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class Groundstone extends Model
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
    public function material()
    {
        return $this->belongsTo('\App\Models\Finds\Material');
    }
    public function groundstone_type()
    {
        return $this->belongsTo('\App\Models\Finds\Stone\GroundstoneType');
    }
}
