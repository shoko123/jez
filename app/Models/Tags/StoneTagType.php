<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\StoneTag;

class StoneTagType extends Model
{
    public $timestamps = false;
    protected $table = 'stone_tag_types';

    public function tags()
    {
        return $this->hasMany(StoneTag::class, 'type_id', 'id');
    }
}
