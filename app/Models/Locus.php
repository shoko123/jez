<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Area;
use App\Models\Finds\Find;


class Locus extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'loci';
    
    public function area()
    {       
        return $this->belongsTo(Area::class, 'area_season_id');
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
