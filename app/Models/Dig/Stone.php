<?php

namespace App\Models\Dig;

use App\Models\BaseDigModel;
use App\Models\Find;
use App\Models\ItemTag;
use App\Models\Tags\StoneTag;
use App\Models\Lookups\StoneBaseType;
use App\Models\Lookups\StoneMaterial;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Stone extends BaseDigModel
{
    use HasTags;

    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        $this->eloquent_model_name = "Stone";
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

    public function module_tags()
    {
        return $this->belongsToMany(StoneTag::class, 'stone-stone_tags', 'item_id', 'tag_id');
    }

    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function baseType()
    {
        return $this->belongsTo(StoneBaseType::class, 'base_type_id');
    }

    public function material()
    {
        return $this->belongsTo(StoneMaterial::class, 'material_id');
    }
}
