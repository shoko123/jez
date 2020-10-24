<?php

namespace App\Models\Dig;

use App\Models\Scene;
use App\Traits\MediaTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Area extends Model implements HasMedia
{
    use InteractsWithMedia, MediaTrait;
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
}
