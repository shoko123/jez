<?php

namespace App\Models\Module\Stone;

use Illuminate\Database\Eloquent\Model;

class StoneOnp extends Model
{
    public $timestamps = false;

    protected $table = 'stone_onps';

    public function item()
    {
        return $this->belongsToMany(Stone::class, 'stone-stone_onps', 'onp_id', 'item_id');
    }
}
