<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Scene;

class Sceneable extends Model
{
    public $timestamps = false;    
    protected $guarded = [];

    public function scene()
    {
        return $this->belongsTo(Scene::class);
    }
}
