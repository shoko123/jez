<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\MetalTag;

class MetalTagType extends Model
{
    public $timestamps = false;
    protected $table = 'metal_tag_types';

    public function tags()
    {
        return $this->hasMany(MetalTag::class, 'type_id', 'id');
    }
}
