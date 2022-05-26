<?php

namespace App\Models\Dig;

use App\Models\Find;
use App\Models\Tags\FaunaTag;
use App\Models\ItemTag;
use App\Models\Lookups\FaunaTaxon;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;
use App\Models\BaseDigModel;

class Fauna extends BaseDigModel
{
    use HasTags;
    protected $table = 'fauna';
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Fauna");        
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
        return $this->belongsToMany(FaunaTag::class, 'fauna-fauna_tags', 'item_id', 'tag_id');
    }

    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function elements()
    {
        return $this->belongsTo(MetalBaseType::class, 'element_L1_id');
    }

    public function taxon()
    {
        return $this->belongsTo(FaunaTaxon::class, 'taxon_L1_id');
    }
}
