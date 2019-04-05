<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Locus;


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
