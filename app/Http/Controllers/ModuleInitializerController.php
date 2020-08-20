<?php

namespace App\Http\Controllers;

use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["id" => 1000, "name" => "Seasons", "display_name" => "Seasons", "module_name" => NULL, "parameter_type" => "table_field", "front_end_category" => "general", "params" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],
        ["id" => 1001, "name" => "Areas", "display_name" => "Areas", "module_name" => NULL, "parameter_type" => "table_field", "front_end_category" => "general", "params" => [
            ["id" => 1101, "name" => "K"],
            ["id" => 1102, "name" => "L"],
            ["id" => 1103, "name" => "M"],
            ["id" => 1104, "name" => "N"],
            ["id" => 1105, "name" => "P"],
            ["id" => 1106, "name" => "Q"],
            ["id" => 1107, "name" => "S"],
        ]],
        ["id" => 1002, "name" => "Media", "display_name" => "Media", "module_name" => NULL, "parameter_type" => "table_field", "front_end_category" => "general", "params" => [
            ["id" => 1201, "name" => "photo"],
            ["id" => 1202, "name" => "drawing"],
            ["id" => 1203, "name" => "plan"],

        ]],
    ];

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');
        $fullModelName = 'App\Models\Dig\\' . $moduleName;

        $tagTypes = TagType::where('module_name', $moduleName)->orWhere('module_name', $moduleName)
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'tag_type_id');}])
            ->orderBy('order_column')
            ->get(['id', 'name', 'display_name', 'module_name', 'parameter_type', 'front_end_category', 'required', 'multiple', 'depends_on_tag_id']);

        //construct 
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["params"] = $params;
            unset($tagType->tags);
        }

        $typesAndParams = array_merge(self::$generalFilters, $tagTypes->toArray());
        
        //get item and media counts
        $itemCount = $fullModelName::count();
        $imageCount = \DB::table('media')->where('model_type', $moduleName)->count();

        return response()->json([
            "tagTypes" => $tagTypes,
            "typesAndParams" => $typesAndParams,
            "itemCount" => $itemCount,
            "imageCount" => $imageCount,
            "misc" => [],
        ], 200);

    }
}
