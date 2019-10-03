<?php

namespace App\Models\Image;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
  public $timestamps = false;   
  protected $guarded = [];

  public function scene()
  {
      return $this->belongdTo('\App\Models\Image\Scene');
  }
}
