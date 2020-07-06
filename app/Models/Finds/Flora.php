<?php

namespace App\Models\Finds;

use App\Models\Finds\Find;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Flora extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    protected $table = 'flora';
    public $timestamps = false;
    
    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
