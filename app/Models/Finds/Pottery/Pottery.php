<?php

namespace App\Models\Finds\Pottery;

use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Image\Scene;

class Pottery extends Model
{
    protected $table = 'pottery';

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
