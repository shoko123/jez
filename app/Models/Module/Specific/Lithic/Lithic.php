<?php

namespace App\Models\Module\Specific\Lithic;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Module\DigModuleModel;
use App\Models\Module\Specific\Locus\Locus;
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

    // protected function casts(): array
    // {
    //     return [
    //         'whole' => 'boolean',
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
            get: fn(mixed $value, array $attributes) => $attributes['field_description'] ?? '[No field description]'
        );
    }
}
