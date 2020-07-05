<?php

namespace App\Models\Finds;

use App\Models\Finds\Find;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;

class Lithic extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    public $timestamps = false;

    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }

    public function lithic_type()
    {
        return $this->belongsTo('\App\Models\Finds\LithicType');
    }
}
