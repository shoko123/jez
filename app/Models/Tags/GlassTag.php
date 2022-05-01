<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\GlassTagType;
use App\Models\Dig\Glass;

class GlassTag extends Model
{
    public $timestamps = false;
    protected $table = 'glass_tags';

    public function tag_type()
    {
        return $this->belongsTo(GlassTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Glass::class, 'glass-glass_tags', 'tag_id', 'item_id');
    }
}
