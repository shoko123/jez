<?php

namespace App\Models\Scene;

use Illuminate\Database\Eloquent\Model;

class MyMedia extends Model
{
  public $timestamps = false;   
  protected $guarded = [];
  protected $table = 'mymedia';

  public function scene()
  {
      return $this->belongsTo('\App\Models\Scene\Scene');
  }
}
