<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    public $timestamps = false;   
    protected $guarded = [];

    public function groundstone()
    {
        return $this->hasOne('\App\Models\Finds\Stone\Groundstone');
    }
}