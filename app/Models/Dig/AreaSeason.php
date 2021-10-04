<?php

namespace App\Models\Dig;
use App\Models\Dig\BaseDigModel;
use App\Models\Dig\Area;
use App\Models\Dig\Locus;
use App\Models\Dig\Season;

class AreaSeason extends BaseDigModel
{
    protected $table = 'areas_seasons';
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("AreaSeason");
    }
    public function area()
    {
        return $this->belongsTo(Area::class, 'area_id');
    }

    public function season()
    {
        return $this->belongsTo(Season::class, 'season_id');
    }

    public function loci()
    {
        return $this->hasMany(Locus::class, 'area_season_id');
    }
}
