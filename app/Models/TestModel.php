<?php

namespace App\Models;


use App\Models\tags\FaunaTag;

use Illuminate\Database\Eloquent\Model;


class TestModel extends Model
{
    public $timestamps = false;
    protected $guarded = [];
    protected $eloquent_model_name;


    public function index($queryParams)
    {
        //get ids and type_ids
        $ts = FaunaTag::whereIn('id', $queryParams["tags"])
            ->select('type_id', 'id')->get();

        //arrange ids according to type_ids
        $types_with_tags = [];
        foreach ($ts as $index => $t) {
            if (array_key_exists($t->type_id, $types_with_tags)) {
                $types_with_tags[$t->type_id] = array_merge($types_with_tags[$t->type_id], array($t->id));
            } else {
                $types_with_tags[$t->type_id] = array($t->id);
            }
        }

        return $types_with_tags;
    }
}
