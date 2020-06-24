<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AreaSeason;
use App\Models\Finds\Find;


class Locus extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'loci';
    
    public function areaSeason()
    {       
        return $this->belongsTo(AreaSeason::class, 'area_season_id');
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }
}
