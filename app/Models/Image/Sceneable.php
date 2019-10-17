<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;

class Sceneable extends Model
{
    public function sceneables()
    {
        return $this->hasMany('\App\Models\Image\Scene');
    }
    public function scene()
    {
        return $this->belongsTo('\App\Models\Image\Scene');
    }
}
