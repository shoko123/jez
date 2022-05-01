<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\LithicTagType;
use App\Models\Dig\Lithic;

class LithicTag extends Model
{
    public $timestamps = false;
    protected $table = 'lithic_tags';

    public function tag_type()
    {
        return $this->belongsTo(LithicTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Lithic::class, 'lithics-lithics_tags', 'tag_id', 'item_id');
    }
}
