<?php

namespace App\Models\Dig;


use App\Models\Dig\BaseDigModel;
use Illuminate\Support\Facades\Storage;

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
        $item->fullUrl = Storage::disk('app-media')->url('about/' .  $item->image . '.jpg');
        $item->tnUrl = Storage::disk('app-media')->url('about/' . $item->image . '-tn.jpg');        
        //$item->tag = $item->name;
        return [
            "item" => $item,
        ];
    }
}
