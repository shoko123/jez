<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    protected $guarded = [];

    public function loci()
    {
        return $this->hasMany('Locus');
    }
}
