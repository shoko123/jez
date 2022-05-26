<?php

namespace App\Models\Dig;


use App\Models\BaseDigModel;

class About extends BaseDigModel
{
    public $timestamps = false;
    protected $table = 'about';  
    protected $guarded = []; 
    
    public function __construct()
    {
        parent::__construct("About");
    }

    public function show($ids)
    {
        $item = $this->findOrFail($ids["id"]);
        $item->dot = $item->tab . '.' . $item->no;
        $item->title = strval($item->tab) . "." . strval($item->no) . " " . $item->title;
        $item->fullUrl = self::$bucketUrl . 'app/about/'.  $item->image . '.jpg'; 
        $item->tnUrl = self::$bucketUrl . 'app/about/'.  $item->image . '-tn.jpg';
             
        return [
            "item" => $item,
        ];
    }
}
