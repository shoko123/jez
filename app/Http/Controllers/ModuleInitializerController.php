<?php

namespace App\Http\Controllers;

use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["id" => 1000, "name" => "Seasons", "display_name" => "Seasons", "type_category" => "filter", "filter_category" => "General", "params" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],
        ["id" => 1001, "name" => "Areas", "display_name" => "Areas", "type_category" => "filter", "filter_category" => "General", "params" => [
            ["id" => 1101, "name" => "K"],
            ["id" => 1102, "name" => "L"],
            ["id" => 1103, "name" => "M"],
            ["id" => 1104, "name" => "N"],
            ["id" => 1105, "name" => "P"],
            ["id" => 1106, "name" => "Q"],
            ["id" => 1107, "name" => "S"],
        ]],
        ["id" => 1002, "name" => "Media", "display_name" => "Media", "type_category" => "filter", "filter_category" => "General", "params" => [
            ["id" => 1201, "name" => "Photo"],
            ["id" => 1202, "name" => "Drawing"],
            ["id" => 1203, "name" => "Plan"],

        ]],
    ];

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');
        $fullModelName = 'App\Models\Dig\\' . $moduleName;

        //get tags that belong to this module and 'Period' tags
        $tagTypes = TagType::where('module_name', $moduleName)->orWhere('module_name', 'Tag')
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'tag_type_id');}])
            ->orderBy('order_column')
            ->get(['id', 'name', 'display_name', 'module_name', 'required', 'multiple', 'depends_on_id', 'dependency']);

        //format tags to fit $typesAndParams structure.
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["filter_category"] = $tagType->module_name === 'Tag' ? 'Period' : 'Module';
            $tagType["type_category"] = 'tag';
            $tagType["dependency"] = json_decode($tagType->dependency);
            $tagType["params"] = $params;
            unset($tagType->tags);
        }

        //get lookup values for module (used by filter, and create).
        $lookupsToSend = $lookups = [];
        switch ($moduleName) {
            case "Stone":

                $lookups = [
                    ["table_name" => "stone_materials", "column_name" => "material_id", "display_name" => "Material", "item_name_field" => "material_name"],
                    ["table_name" => "preservations", "column_name" => "preservation_id", "display_name" => "Preservation", "item_name_field" => "preservation_name"],
                    ["table_name" => "stone_base_types", "column_name" => "base_type_id", "display_name" => "Base Typology", "item_name_field" => "base_type_name"]];
                break;
            case "Lithic":
                $lookups = [
                    ["table_name" => "lithic_base_types", "column_name" => "base_type_id", "display_name" => "Base Typology", "item_name_field" => "base_type_name"],
                ];
                break;
        }

        //access DB and format
        foreach ($lookups as $index => $lookup) {
            $params = \DB::table($lookup["table_name"])->get();
            array_push($lookupsToSend, ["id" => $index, "column_name" => $lookup["column_name"], "name" => $lookup["display_name"], "item_name_field" => $lookup["item_name_field"], "display_name" => $lookup["display_name"], "type_category" => "lookup", "filter_category" => "Module", 'params' => $params]);
        }

        //format partitions to fit $typesAndParams structure.

        $partitionsFormatted = [];

        $typesAndParams = array_merge(self::$generalFilters, $lookupsToSend, $tagTypes->toArray());
        foreach ($typesAndParams as $index => &$localType) {
            $localType["local_type_id"] = $index;
        }

        //get item and media counts
        $itemCount = $fullModelName::count();
        $imageCount = \DB::table('media')->where('model_type', $moduleName)->count();

        return response()->json([
            "tagTypes" => $tagTypes,
            "lookups" => $lookupsToSend,
            "typesAndParams" => $typesAndParams,
            "itemCount" => $itemCount,
            "imageCount" => $imageCount,
            "misc" => [],
        ], 200);
    }
}
