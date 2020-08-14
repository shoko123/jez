<?php

namespace App\Models\Dig;

use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class AreaSeason extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;
    protected $table = 'areas_seasons';
    protected $guarded = [];

    public function loci()
    {
        return $this->hasMany(Locus::class, 'area_season_id');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
