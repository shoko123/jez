<?php

namespace App\Models\Dig;

use App\Models\Find;
use Illuminate\Database\Eloquent\Model;

class Specialist extends Model
{
    public $timestamps = false;

    public function finds()
    {
        return $this->belongsToMany(Find::class);
    }
}
