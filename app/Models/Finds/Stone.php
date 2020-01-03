<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use App\Models\Finds\Find;
use App\Models\Finds\Material;
use App\Models\Finds\StoneType;
use App\Models\Image\Scene;

class Stone extends Model
{
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
    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public function stone_type()
    {
        return $this->belongsTo(StoneType::class);
    }
    public function scopeOrderByAreaLocus($query){


        return $query->join('finds', 'finds.findable_id', '=', 'stones.id')
        ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
        ->orderBy('loci.area_id')
        ->orderBy('loci.locus')
        ->where('finds.findable_type', '=', 'Stone')
        ->select('stones.*')
        ->get();

        /*
        //return $query->where('votes', '>', 100);
        $stone = \DB::table('finds')
        ->join('stones', 'finds.findable_id', '=', 'stones.id')
        ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
        ->orderBy('loci.area_id')
        ->orderBy('loci.locus')
        ->where('finds.findable_type', '=', 'Stone')
        ->select('stones.*')
        ->get();
        return $stone;
        */
    }
    
}
