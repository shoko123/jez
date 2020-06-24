<?php

namespace App\Models\Scene;

use Illuminate\Database\Eloquent\Model;

class Sceneable extends Model
{
    public $timestamps = false;    
    protected $guarded = [];

    public function sceneables()
    {
        return $this->hasMany('\App\Models\Scene\Scene');
    }
    public function scene()
    {
        return $this->belongsTo('\App\Models\Scene\Scene');
    }
}
