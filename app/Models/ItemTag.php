<?php

namespace App\Models;

use App\Models\TagType;
use \Spatie\Tags\Tag;

class ItemTag extends Tag
{
    protected $table = 'tags';

    public function tag_types()
    {
        return $this->belongsTo(TagType::class, 'type', 'str_id');
    }
}
