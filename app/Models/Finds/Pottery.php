<?php

namespace App\Models\Finds;

use App\Models\Finds\Find;
use App\Models\Scene\Scene;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Pottery extends Model implements HasMedia
{
    use InteractsWithMedia;

    public $timestamps = false;
    protected $table = 'pottery';
    protected $guarded = [];

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('tn')
            ->width(250)
            ->height(250)
            ->sharpen(10)
            ->nonQueued();
    }

    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
        //return $this->morphOne('\App\Models\Finds\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
