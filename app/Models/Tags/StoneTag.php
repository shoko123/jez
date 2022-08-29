<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\StoneTagType;
use App\Models\Dig\Stone;

class StoneTag extends Model
{
    public $timestamps = false;
    protected $table = 'stone_tags';

    public function tag_type()
    {
        return $this->belongsTo(StoneTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Stone::class, 'stone-stone_tags', 'tag_id', 'item_id');
    }
}
