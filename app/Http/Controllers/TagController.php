<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Spatie\Tags\Tag;
use App\Models\Finds\Stone;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $stone = Stone::findOrFail($request->input('item_id'));
        
        $tags = $request->input('tags');
        foreach($tags as $tag) {            
            $stone->tags()->attach(Tag::findOrCreate($tag{"name"}, $tag{"type"}));
        }
        

        return response()->json([
            "back from tagger" => "Hello"], 200);
    }
}
