<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class StoneType extends Model
{
    protected $table = 'stone_types';
    public $timestamps = false;   
    protected $guarded = [];
    
    public function groundstone()
    {       
        return $this->hasOne(Groundstone::class);
    }
}
