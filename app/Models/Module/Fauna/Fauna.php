<?php

namespace App\Models\Module\Fauna;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Locus\Locus;
use App\Models\Tag\Tag;

class Fauna extends DigModuleModel
{
    protected $table = 'fauna';
    protected $moduleTagTable = 'fauna_tags';
    protected $onpTable = 'fauna_onps';

    public function locus()
    {
        return $this->belongsTo(Locus::class);
    }

    public function module_tags()
    {
        return $this->belongsToMany(FaunaTag::class, 'fauna-fauna_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function primaryTaxon()
    {
        return $this->belongsTo(FaunaTaxa::class, 'primary_taxon_id');
    }

    public function scope()
    {
        return $this->belongsTo(FaunaScope::class, 'scope_id');
    }

    public function material()
    {
        return $this->belongsTo(FaunaMaterial::class, 'material_id');
    }

    public function onps()
    {
        return $this->belongsToMany(FaunaOnp::class, 'fauna-fauna_onps', 'item_id', 'onp_id')->withPivot('value');
    }
}
