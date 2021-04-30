<?php

namespace App\Http\Controllers;

use App\Models\ItemTag;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test(Request $request)
    {

        $tag_types = (object)[];


        foreach ($request["tags"] as $index => $tag_id) {
            $t = ItemTag::select('type', 'name')->findOrFail($tag_id);
            $type = $t->type;
            
            if(property_exists($tag_types, $type)){
                array_push($tag_types->$type, $t->name);
            }else {
                $tag_types->$type = array($t->name);
            }     
        }




        /*
        foreach ($request["tags"] as $index => $tag_id) {
            $type = TagType::select('str_id')->whereHas('tags', function ($query) use ($tag_id) {
                return $query->where('id', '=', $tag_id);
            })->get();
            $type_name = $type[0]->str_id;

            if(property_exists($tag_types, $type_name)){
                array_push($tag_types->$type_name, $tag_id);
            }else {
                $tag_types->$type_name = array($tag_id);
            }  
        }

        */
        return response()->json([
            "msg" => "I am hungry",
            "types" => $tag_types,
            "t" => $t,
        ], 200);
    }
}
