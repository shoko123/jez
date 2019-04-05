<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class Scene extends Model
{
    public function areas()
    {
        return $this->morphedByMany('Area', 'sceneable');
    }

    public function loci()
    {
        return $this->morphedByMany('Locus', 'sceneable');
    }

    public function potteryBaskets()
    {
        return $this->morphedByMany('PotteryBasket', 'sceneable');
    }

    public function potterys()
    {
        return $this->morphedByMany('Pottery', 'sceneable');
    }
    public function flints()
    {
        return $this->morphedByMany('Flint', 'sceneable');
    }

    public function groundstone()
    {
        return $this->morphedByMany('Groundstone', 'sceneable');
    }
    public function stones()
    {
        return $this->morphedByMany('Stone', 'sceneable');
    }

    public function faunas()
    {
        return $this->morphedByMany('Fauna', 'sceneable');
    }

    public function floras()
    {
        return $this->morphedByMany('Flora', 'sceneable');
    }

    public function shells()
    {
        return $this->morphedByMany('Shell', 'sceneable');
    }

    public function glasses()
    {
        return $this->morphedByMany('Glass', 'sceneable');
    }

    public function metals()
    {
        return $this->morphedByMany('Metal', 'sceneable');
    }

    public function tbds()
    {
        return $this->morphedByMany('Tbd', 'sceneable');
    }


}
