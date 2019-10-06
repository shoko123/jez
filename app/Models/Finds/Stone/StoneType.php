<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class StoneType extends Model
{
    protected $table = 'stone_types';
    public $timestamps = false;   
    protected $guarded = [];
    
    public function stone()
    {       
        return $this->hasOne(Stone::class);
    }
}
