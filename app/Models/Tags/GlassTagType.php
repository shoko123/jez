<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\GlassTag;

class GlassTagType extends Model
{
    public $timestamps = false;
    protected $table = 'glass_tag_types';

    public function tags()
    {
        return $this->hasMany(GlassTag::class, 'type_id', 'id');
    }
}
