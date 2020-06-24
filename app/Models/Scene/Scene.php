<?php

namespace App\Models\Scene;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

use App\Models\Scene\MyMedia;

class Scene extends Model
{
    public $timestamps = false;    
    protected $guarded = [];
    
    public function mymedia()
    {
        return $this->hasMany('\App\Models\Scene\MyMedia');
    }

    public function sceneables()
    {
        return $this->hasMany('\App\Models\Scene\Sceneable', 'scene_id');
    }    

    public function areasSeasons()
    {
        return $this->morphedByMany('AreaSeason', 'sceneable');
    }

    public function loci()
    {
        return $this->morphedByMany('Locus', 'sceneable');
    }

    public function potterys()//ies
    {
        return $this->morphedByMany('Pottery', 'sceneable');
    }
    public function lithics()
    {
        return $this->morphedByMany('Lithic', 'sceneable');
    }

    public function stones()
    {
        return $this->morphedByMany('Stone', 'sceneable');
    }

    public function faunas()
    {
        return $this->morphedByMany('Fauna', 'sceneable');
    }

    public function floras()
    {
        return $this->morphedByMany('Flora', 'sceneable');
    }

    public function glasses()
    {
        return $this->morphedByMany('Glass', 'sceneable');
    }

    public function metals()
    {
        return $this->morphedByMany('Metal', 'sceneable');
    }

    public function tbds()
    {
        return $this->morphedByMany('Tbd', 'sceneable');
    }

    

}
