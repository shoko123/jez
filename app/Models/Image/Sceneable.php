<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;

class Sceneable extends Model
{
    public function sceneables()
    {
        return $this->hasMany('\App\Models\Image\Scene');
        //return $this->hasMany(Image::class);
    }
}
