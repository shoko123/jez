<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\ItemTag;
use App\Models\Lookups\MetalBaseType;
use App\Models\Lookups\MetalMaterial;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Metal extends BaseDigModel
{
    use HasTags;

    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Metal");
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
