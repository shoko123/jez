<?php

namespace App\Models\Dig;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\Find;
use App\Models\Scene;
use App\Traits\MediaTrait;
use App\Traits\RegistrationTagTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Locus extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia, MediaTrait, RegistrationTagTrait;

    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'loci';

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('tn')
            ->width(250)
            ->height(250)
            ->sharpen(10)
            ->nonQueued();
    }

    public function areaSeason()
    {
        return $this->belongsTo(AreaSeason::class, 'area_season_id');
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
