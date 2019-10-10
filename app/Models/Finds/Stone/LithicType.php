<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class LithicType extends Model
{
    protected $table = 'lithic_types';
    public $timestamps = false;   
    protected $guarded = [];
    
    public function lithic()
    {       
        return $this->hasOne(Lithic::class);
    }
}
