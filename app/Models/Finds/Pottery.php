<?php

namespace App\Models\Finds;
use App\Models\Finds\Find;
use App\Models\Media\Scene;
use Illuminate\Database\Eloquent\Model;

class Pottery extends Model
{    
     public $timestamps = false;
     protected $table = 'pottery';
     protected $guarded = [];
   
    
    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
        //return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
