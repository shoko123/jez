<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\LocusTagType;
use App\Models\Dig\Locus;

class LocusTag extends Model
{
    public $timestamps = false;
    protected $table = 'locus_tags';

    public function tag_type()
    {
        return $this->belongsTo(LocusTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Locus::class, 'locus-locus_tags', 'tag_id', 'item_id');
    }
}
