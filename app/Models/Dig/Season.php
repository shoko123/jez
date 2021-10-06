<?php
namespace App\Models\Dig;

use App\Models\Dig\AreaSeason;
use App\Models\Dig\BaseDigModel;

class Season extends BaseDigModel
{
    public $timestamps = false;
    protected $guarded = [];

    public function __construct()
    {
        parent::__construct("Season");
    }

    public function areas_seasons()
    {
        return $this->hasMany(AreaSeason::class, 'season_id');
    }
}
