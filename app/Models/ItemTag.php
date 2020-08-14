<?php

namespace App\Models;

use \Spatie\Tags\Tag;
use App\Models\TagType;
class ItemTag extends Tag
{
    protected $table = 'tags';

    public function tag_types()
    {
        return $this->belongsTo(TagType::class, 'tag_type_id');
    }
}
