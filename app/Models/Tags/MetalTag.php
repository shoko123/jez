<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\MetalTagType;
use App\Models\Dig\Metal;

class MetalTag extends Model
{
    public $timestamps = false;
    protected $table = 'metal_tags';

    public function tag_type()
    {
        return $this->belongsTo(MetalTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Metal::class, 'metals-metals_tags', 'tag_id', 'item_id');
    }
}
