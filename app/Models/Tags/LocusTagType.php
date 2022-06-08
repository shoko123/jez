<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\LocusTag;

class LocusTagType extends Model
{
    public $timestamps = false;
    protected $table = 'locus_tag_types';

    public function tags()
    {
        return $this->hasMany(LocusTag::class, 'type_id', 'id');
    }
}
