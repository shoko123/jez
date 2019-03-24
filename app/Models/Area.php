<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $guarded = [];

    public function loci()
    {
        return $this->hasMany(Locus::class);
    }

    public static function areasList()
    {
        $areas = \DB::table('areas')
            ->select('id', 'year', 'area')
            ->orderBy('year')
            ->orderBy('area')->get();
        return $areas;
    }
}
