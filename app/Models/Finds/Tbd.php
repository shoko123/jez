<?php

namespace App\Models\Finds;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Tags\HasTags;

class Tbd extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    public $timestamps = false;

    protected $guarded = [];

    public function find()
    {
        return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }
}
