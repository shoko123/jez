<?php

namespace App\Http\Controllers;

use App\Models\ItemTag;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class TestController extends Controller
{
    public function test(Request $request)
    {

        $tag_types = (object) [];

        foreach ($request["tags"] as $index => $tag_id) {
            $t = ItemTag::select('type', 'name')->findOrFail($tag_id);
            $type = $t->type;

            if (property_exists($tag_types, $type)) {
                array_push($tag_types->$type, $t->name);
            } else {
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

    public function getId(Request $request)
    {      
        $v = Validator::make($request->all(), [
            'module' => [Rule::in(['Area', 'Season', 'AreaSeason', 'Locus', 'Pottery', 'Lithic', 'Stone', 'Glass', 'Metal', 'Fauna', 'Flora'])],
            'area' => [Rule::in(['K', 'L', 'M', 'N', 'P', 'Q', 'S'])],
            'season' => 'numeric|min:12|max:18',
            'locus_no' => 'numeric|min:0|max:999',
        ]);

        if ($v->fails()) {
            return response()->json([
                "msg" => "Invalid params",   
                "errors" => $v->errors()->all(),
                "id" => null,
            ], 422);
        }

        $module = $request['module'];
        $area = $request['area'];
        $season = $request['season'];
        $locus_no = $request['locus_no'];
        $res = null;

        switch ($module) {
            case "Locus":
                $res = \DB::table('areas_seasons')
                    ->join('loci', function ($join) use ($locus_no, $season) {
                        $join->on('areas_seasons.id', '=', 'loci.area_season_id')
                            ->where('loci.locus_no', '=', $locus_no);
                    })->where('areas_seasons.season', '=', $season)->where('areas_seasons.area', '=', $area)->get('loci.id AS id');
                break;
            case "Pottery":
            default:
                $res = "BIG ERROR";

        }

        if ($res === "BIG ERROR") {
            return response()->json([
                "msg" => "Bad Parameters",   
                "id" => null,
            ], 422);
        } else {
            return response()->json([
                "msg" => "Found",
                //"req" => $request,
                //"res" => $res,
                "id" => $res[0]->id,
            ], 200);
        }
    }
}
