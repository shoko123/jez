<?php

namespace App\Models\Dig;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\BaseDigModel;

class Area extends BaseDigModel
{
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Area");
    }
  
    public function areas_seasons()
    {
        return $this->hasMany(AreaSeason::class, 'area_id');
    }
}
