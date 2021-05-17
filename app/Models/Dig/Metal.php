<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\ItemTag;
use App\Models\Lookups\MetalBaseType;
use App\Models\Lookups\MetalMaterial;
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

class Metal extends Model implements HasMedia
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

    public function baseType()
    {
        return $this->belongsTo(MetalBaseType::class, 'base_type_id');
    }

    public function material()
    {
        return $this->belongsTo(MetalMaterial::class, 'material_id');
    }
}
