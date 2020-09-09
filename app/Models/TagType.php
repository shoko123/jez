<?php

namespace App\Models;

use \Spatie\Tags\Tag;
use App\Models\TagType;
use App\Models\ItemTag;
use Illuminate\Database\Eloquent\Model;
class TagType extends Model
{
    protected $table = 'tag_types';
    public $keyType = 'string';
    public $timestamps = false;
    
    public function tags()
    {
        //non standard naming requires class, FK name, referenced column name.
        return $this->hasMany(ItemTag::class, 'type', 'str_id');
    } 
}
