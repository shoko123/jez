<?php

namespace App\Models\tags;

use Illuminate\Database\Eloquent\Model;
use App\Models\tags\FaunaTagType;

class FaunaTag extends Model
{
    public $timestamps = false;
    protected $table = 'fauna_tags';

    public function fauna_tag_type()
    {
        return $this->belongsTo(FaunaTagType::class, 'type_id');
    }
}
