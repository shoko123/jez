<?php

namespace App\Models\Dig;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Dig\Locus;


class Find extends Model
{
    public $timestamps = false;
    
    protected $guarded = [];
    
    public function locus()
    {       
        return $this->belongsTo(Locus::class);
    }

    public function findable()
    {
        return $this->morphTo();
    }
}
