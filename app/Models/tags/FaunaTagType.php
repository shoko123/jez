<?php

namespace App\Models\tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\tags\FaunaTag;

class FaunaTagType extends Model
{
    public $timestamps = false;
    protected $table = 'fauna_tag_types';

    public function tags()
    {
        return $this->hasMany(FaunaTag::class, 'type_id', 'id');
    }
}
