<?php

namespace App\Models\Module\Stone;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Stone extends DigModuleModel
{
    protected $table = 'stones';
    protected $moduleTagTable = 'stone_tags';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(StoneTag::class, 'stone-stone_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function primaryClassification()
    {
        return $this->belongsTo(StonePrimaryClassification::class, 'primary_classification_id');
    }

    public function material()
    {
        return $this->belongsTo(StoneMaterial::class, 'material_id');
    }

    public function onps()
    {
        return $this->belongsToMany(StoneOnp::class, 'stone-stone_onps', 'item_id', 'onp_id')->withPivot('value');
    }
}
