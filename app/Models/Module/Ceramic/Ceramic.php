<?php

namespace App\Models\Module\Ceramic;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Ceramic extends DigModuleModel
{
    protected $table = 'ceramics';
    protected $moduleTagTable = 'ceramic_tags';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(CeramicTag::class, 'ceramic-ceramic_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
