<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Dig\Locus;
use App\Models\Dig\Specialist;
use App\Models\Lookups\Preservation;

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
    public function preservation()
    {
        return $this->belongsTo(Preservation::class, 'preservation_id');
    }

    public function specialists()
    {
        return $this->belongsToMany(Specialist::class);
    }
}
