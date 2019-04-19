<?php

namespace App\Models\Finds\Pottery;
use App\Models\Finds\Find;

use Illuminate\Database\Eloquent\Model;

class PotteryBasket extends Model
{
    public $timestamps = false;
    
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
        //return $this->morphOne('App\Models\Find', 'findable');
    }
}
