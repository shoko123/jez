<?php

namespace App\Models\Dig;

use App\Models\BaseDigModel;
use App\Models\Find;
use App\Models\ItemTag;
use App\Models\Tags\PotteryTag;
use App\Models\Lookups\PotteryBaseType;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Pottery extends BaseDigModel
{
    use HasTags;

    public $timestamps = false;
    protected $table = 'pottery';
    protected $guarded = [];

    public function __construct()
    {
        $this->eloquent_model_name = "Pottery";
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
        return $this->belongsToMany(PotteryTag::class, 'pottery-pottery_tags', 'item_id', 'tag_id');
    }
    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function baseType()
    {
        return $this->belongsTo(PotteryBaseType::class, 'base_type_id');
    }
}
