<?php

namespace App\Models\Dig;
use App\Models\Dig\AreaSeason;
use App\Models\Dig\BaseDigModel;
use App\Models\Dig\Find;

class Locus extends BaseDigModel
{
    public $timestamps = false;
    protected $guarded = [];
    protected $table = 'loci';

    public function __construct()
    {
        parent::__construct("Locus");
    }
    public function areaSeason()
    {
        return $this->belongsTo(AreaSeason::class, 'area_season_id');
    }

    public function finds()
    {
        return $this->hasMany(Find::class);
    }
}
