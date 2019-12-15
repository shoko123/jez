<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Stone extends Model
{
    public $timestamps = false;
    
    protected $guarded = [];

    public function find()
    {
        return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
    public function material()
    {
        return $this->belongsTo('\App\Models\Finds\Material');
    }

    public function stone_type()
    {
        return $this->belongsTo('\App\Models\Finds\StoneType');
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
