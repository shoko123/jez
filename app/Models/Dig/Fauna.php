<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\ItemTag;
use App\Models\Lookups\FaunaTaxon;
use App\Models\Lookups\FaunaElements;

use App\Models\Scene;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Fauna extends BaseDigModel
{
    use HasTags;
    protected $table = 'fauna';
    public $timestamps = false;

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
