<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\Scene;
use App\Traits\MediaTrait;
use App\Traits\RegistrationTagTrait;
use App\Traits\FilterTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Pottery extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia, MediaTrait, RegistrationTagTrait, FilterTrait;

    protected $table = 'pottery';
    public $timestamps = false;
   
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
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}