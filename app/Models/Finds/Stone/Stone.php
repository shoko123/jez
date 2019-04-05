<?php

namespace App\Models\Finds\Stone;

use Illuminate\Database\Eloquent\Model;

class Stone extends Model
{
    public function find()
    {
        return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
