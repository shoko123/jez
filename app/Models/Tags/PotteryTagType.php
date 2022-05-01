<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\PotteryTag;

class PotteryTagType extends Model
{
    public $timestamps = false;
    protected $table = 'pottery_tag_types';

    public function tags()
    {
        return $this->hasMany(PotteryTag::class, 'type_id', 'id');
    }
}
