<?php

namespace App\Models\Tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tags\PotteryTagType;
use App\Models\Dig\Pottery;

class PotteryTag extends Model
{
    public $timestamps = false;
    protected $table = 'pottery_tags';

    public function tag_type()
    {
        return $this->belongsTo(PotteryTagType::class, 'type_id');
    }

    public function item()
    {
        return $this->belongsToMany(Pottery::class, 'pottery-pottery_tags', 'tag_id', 'item_id');
    }
}
