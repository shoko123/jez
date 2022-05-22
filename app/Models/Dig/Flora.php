<?php

namespace App\Models\Dig;

use App\Models\BaseDigModel;
use App\Models\Find;
use App\Models\Tags\FloraTag;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;


class Flora extends BaseDigModel
{
    use HasTags;
    protected $table = 'flora';
    public $timestamps = false;

    public function __construct()
    {
        $this->eloquent_model_name = "Flora";
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
        return $this->belongsToMany(FloraTag::class, 'flora-flora_tags', 'item_id', 'tag_id');
    }

    public function find()
    {
        return $this->morphOne(Find::class, 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
