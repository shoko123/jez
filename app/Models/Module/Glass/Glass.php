<?php

namespace App\Models\Module\Glass;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Glass extends DigModuleModel
{
    protected $table = 'glass';
    protected $moduleTagTable = 'glass_tags';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(GlassTag::class, 'glass-glass_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function primaryClassification()
    {
        return $this->belongsTo(GlassPrimaryClassification::class, 'primary_classification_id');
    }
}
