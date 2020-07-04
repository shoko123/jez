<?php

namespace App\Models;

use App\Models\AreaSeason;
use App\Models\Finds\Find;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Locus extends Model implements HasMedia
{
    use InteractsWithMedia;

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
        return $this->morphToMany('\App\Models\Scene\Scene', 'sceneable');
    }
}
