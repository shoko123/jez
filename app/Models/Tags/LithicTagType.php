<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\LithicTag;

class LithicTagType extends Model
{
    public $timestamps = false;
    protected $table = 'lithic_tag_types';

    public function tags()
    {
        return $this->hasMany(LithicTag::class, 'type_id', 'id');
    }
}
