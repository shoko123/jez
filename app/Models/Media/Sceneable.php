<?php

namespace App\Models\Media;

use Illuminate\Database\Eloquent\Model;

class Sceneable extends Model
{
    public $timestamps = false;    
    protected $guarded = [];

    public function sceneables()
    {
        return $this->hasMany('\App\Models\Media\Scene');
    }
    public function scene()
    {
        return $this->belongsTo('\App\Models\Media\Scene');
    }
}
