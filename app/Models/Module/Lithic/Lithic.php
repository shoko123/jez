<?php

namespace App\Models\Module\Lithic;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Lithic extends DigModuleModel
{
    protected $table = 'lithics';
    protected $moduleTagTable = 'lithic_tags';
    protected $onpTable = 'lithic_onps';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(LithicTag::class, 'lithic-lithic_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function onps()
    {
        return $this->belongsToMany(LithicOnp::class, 'lithic-lithic_onps', 'item_id', 'onp_id')->withPivot('value');
    }
}
