<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreaSeason extends Model
{
    protected $guarded = [];
    
    protected $table = 'areas_seasons';
    public function loci()
    {
        return $this->hasMany(Locus::class, 'area_season_id');
    }
}
