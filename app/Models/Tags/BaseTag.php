<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\FaunaTag;

class BaseTag extends Model
{
    public $timestamps = false;
    

    public function tags()
    {
        return $this->hasMany(FaunaTag::class, 'type_id', 'id');
    }
}
