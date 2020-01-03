<?php
namespace App\Models\Finds;
use Illuminate\Database\Eloquent\Model;
use App\Models\Finds\Find;

class PotteryBasket extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    
    public function find()
    {
        return $this->morphOne('Find::class', 'findable');
    }
    public function scenes()
    {
        return $this->morphToMany('\App\Models\Image\Scene', 'sceneable');
    }
}
