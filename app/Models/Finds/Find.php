<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Locus;

Relation::morphMap([
    'Fauna'         => 'App\Models\Finds\Fauna',
    'Flora'         => 'App\Models\Finds\Flora',
    'Flint'         => 'App\Models\Finds\Stone\Flint',
    'Glass'         => 'App\Models\Finds\Glass',
    'Metal'         => 'App\Models\Finds\Metal',
    'Shell'         => 'App\Models\Finds\Shell',
    'Stone'         => 'App\Models\Finds\Stone\Stone',
    'Tbd'           => 'App\Models\Finds\Tbd',
    'PotteryBasket' => 'App\Models\Finds\Pottery\PotteryBasket',
    'Pottery'       => 'App\Models\Finds\Pottery\Pottery'
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
