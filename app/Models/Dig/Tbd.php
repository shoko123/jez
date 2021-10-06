<?php

namespace App\Models\Dig;

use App\Models\Dig\Find;
use App\Models\Scene;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Spatie\Tags\HasTags;

class Tbd extends BaseDigModel
{
    use HasTags;

    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Tbd");
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
        return $this->morphOne('\App\Models\Dig\Find', 'findable');
    }

    public function scenes()
    {
        return $this->morphToMany(Scene::class, 'sceneable');
    }
}
