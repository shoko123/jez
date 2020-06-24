<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use App\Models\Finds\Find;
use App\Models\Scene\Scene;

class Stone extends Model
{
    use \Spatie\Tags\HasTags;  

    public $timestamps = false;
    
    protected $guarded = [];

    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
   
    public function scopeOrderByAreaLocus($query){
        return $query->join('finds', 'finds.findable_id', '=', 'stones.id')
        ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
        ->orderBy('loci.area_season_id')
        ->orderBy('loci.locus_no')
        ->where('finds.findable_type', '=', 'Stone')
        ->select('stones.*')
        ->get();
    }
    
}
