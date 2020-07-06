<?php

namespace App\Models\Finds;

use App\Models\Finds\Find;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;


class Stone extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia;

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

    public function scopeOrderByAreaLocus($query)
    {
        return $query->join('finds', 'finds.findable_id', '=', 'stones.id')
            ->leftJoin('loci', 'finds.locus_id', '=', 'loci.id')
            ->orderBy('loci.area_season_id')
            ->orderBy('loci.locus_no')
            ->where('finds.findable_type', '=', 'Stone')
            ->select('stones.*')
            ->get();
    }

}
