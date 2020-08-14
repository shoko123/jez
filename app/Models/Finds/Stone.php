<?php

namespace App\Models\Finds;

use App\Models\Finds\Find;
use App\Models\ItemTag;
use App\Models\Scene;
use App\Traits\FilterTrait;
use App\Traits\MediaTrait;
use App\Traits\RegistrationTagTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class Stone extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia, MediaTrait, RegistrationTagTrait, FilterTrait;

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

    //The following 2 functions are needed because I use my owm ItemTag model instead of Spatie/tag.
    public static function getTagClassName(): string
    {
        return ItemTag::class;
    }
    
    public function tags(): MorphToMany
    {
        return $this
            ->morphToMany(self::getTagClassName(), 'taggable', 'taggables', null, 'tag_id')
            ->orderBy('order_column');
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
