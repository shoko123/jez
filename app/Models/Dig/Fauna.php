<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\Partition;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Fauna extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    protected $table = 'fauna';
    public $timestamps = false;    
    
 
    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }

    public function baseType()
    {
        return $this->belongsTo(Partition::class, 'base_type_id');
    }    
}
