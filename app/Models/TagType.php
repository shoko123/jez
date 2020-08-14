<?php

namespace App\Models;

use \Spatie\Tags\Tag;
use App\Models\TagType;
use App\Models\ItemTag;
use Illuminate\Database\Eloquent\Model;
class TagType extends Model
{
    protected $table = 'tag_types';
    public $timestamps = false;
    
    public function tags()
    {
        return $this->hasMany(ItemTag::class, 'tag_type_id');
    } 
}
