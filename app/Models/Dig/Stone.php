<?php

namespace App\Models\Dig;

use App\Models\Dig\BaseDigModel;
use App\Models\Dig\Find;
use App\Models\ItemTag;
use App\Models\Lookups\StoneBaseType;
use App\Models\Lookups\StoneMaterial;
use App\Traits\FilterTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

use Spatie\Tags\HasTags;

class Stone extends BaseDigModel
{
    use HasTags, FilterTrait;

    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Stone");
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

    public function baseType()
    {
        return $this->belongsTo(StoneBaseType::class, 'base_type_id');
    }
    public function material()
    {
        return $this->belongsTo(StoneMaterial::class, 'material_id');
    }
}
