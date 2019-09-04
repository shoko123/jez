<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Area;
use App\Models\Finds\Find;


class Locus extends Model
{
    protected $guarded = [];
    protected $table = 'loci';


    public function area()
    {       
        return $this->belongsTo(Area::class);
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }

    public function scopeArea($query, $areaId)
    {
        return $query->where('area_id', $areaId);
    }

}
