<?php

namespace App\Models\Module\Specific\Fauna;

use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Specific\Locus\Locus;
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
    // protected function casts(): array
    // {
    //     return [
    //         'has_butchery_evidence' => 'boolean',
    //         'has_burning_evidence' => 'boolean',
    //         'has_other_bsm_evidence' => 'boolean',

    //     ];
    // }

    protected function derivedId(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['locus_id'] . $attributes['code'] . str_pad($attributes['basket_no'], 2, '0', STR_PAD_LEFT) . str_pad($attributes['artifact_no'], 2, '0', STR_PAD_LEFT)
        );
    }

    protected function short(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => $attributes['taxa'] ?? '[No description]'
        );
    }
}
