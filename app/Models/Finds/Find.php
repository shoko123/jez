<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Locus;

Relation::morphMap([
    'PotteryBasket' => 'App\Models\Finds\Pottery\PotteryBasket',
    'Pottery'       => 'App\Models\Finds\Pottery\Pottery',
    'Flint'         => 'App\Models\Finds\Stone\Flint',
    'Groundstone'   => 'App\Models\Finds\Stone\Groundstone',
    'Stone'         => 'App\Models\Finds\Stone\Stone',
    'Fauna'         => 'App\Models\Finds\Fauna',
    'Flora'         => 'App\Models\Finds\Flora',
    'Shell'         => 'App\Models\Finds\Shell',
    'Glass'         => 'App\Models\Finds\Glass',
    'Metal'         => 'App\Models\Finds\Metal',    
    'Tbd'           => 'App\Models\Finds\Tbd',
]);



class Find extends Model
{
    public function locus()
    {       
        return $this->belongsTo(Locus::class);
    }

    public function findable()
    {
        return $this->morphTo();
    }
}
