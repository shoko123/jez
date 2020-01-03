<?php
namespace App\Models\Finds;
use Illuminate\Database\Eloquent\Model;
use App\Models\Finds\Find;
use App\Models\Image\Scene;

class Pottery extends Model
{    
     public $timestamps = false;
     protected $table = 'pottery';
     protected $guarded = [];
   
    
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
