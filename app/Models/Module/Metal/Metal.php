<?php

namespace App\Models\Module\Metal;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Metal extends DigModuleModel
{
    protected $table = 'metals';
    protected $moduleTagTable = 'metal_tags';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(MetalTag::class, 'metal-metal_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function primaryClassification()
    {
        return $this->belongsTo(MetalPrimaryClassification::class, 'primary_classification_id');
    }

    public function material()
    {
        return $this->belongsTo(MetalMaterial::class, 'material_id');
    }
}
