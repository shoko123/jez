<?php

namespace App\Models\Finds;
use App\Models\Finds\Find;
use App\Models\Scene\Scene;
use Illuminate\Database\Eloquent\Relations\Relation;

use Illuminate\Database\Eloquent\Model;

class Lithic extends Model
{
    public $timestamps = false;
    
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }

    public function lithic_type()
    {
        return $this->belongsTo('\App\Models\Finds\LithicType');
    }
}
