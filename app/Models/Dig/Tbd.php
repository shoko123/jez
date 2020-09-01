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



class Tbd extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    public $timestamps = false;

    protected $guarded = [];

    public function find()
    {
        return $this->morphOne('\App\Models\Dig\Find', 'findable');
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
