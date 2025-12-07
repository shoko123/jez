<?php

namespace App\Models\Module\Locus;

use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Models\Tag\Tag;

class Locus extends DigModuleModel
{
    protected $table = 'loci';
    protected $moduleTagTable = 'locus_tags';

    public function area()
    {
        return $this->belongsTo(GetService::getModel('Area'));
    }

    public function season()
    {
        return $this->belongsTo(GetService::getModel('Season'));
    }

    public function ceramics()
    {
        return $this->hasMany(GetService::getModel('Ceramic'));
    }

    public function fauna()
    {
        return $this->hasMany(GetService::getModel('Fauna'), 'locus_id', 'id');
    }

    public function glass()
    {
        return $this->hasMany(GetService::getModel('Glass'));
    }

    public function lithics()
    {
        return $this->hasMany(GetService::getModel('Lithic'), 'locus_id', 'id');
    }

    public function metals()
    {
        return $this->hasMany(GetService::getModel('Metal'));
    }

    public function stones()
    {
        return $this->hasMany(GetService::getModel('Stone'), 'locus_id', 'id');
    }

    public function module_tags()
    {
        return $this->belongsToMany(LocusTag::class, 'locus-locus_tags', 'item_id', 'tag_id');
    }

    public function global_tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
