<?php

namespace App\Models\Media;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
  public $timestamps = false;   
  protected $guarded = [];
  protected $table = 'media';

  public function scene()
  {
      return $this->belongsTo('\App\Models\Media\Scene');
  }
}
