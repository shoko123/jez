<?php

namespace App\Http\Controllers;

use App\Models\Partition;
use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["id" => 1000, "name" => "Seasons", "display_name" => "Seasons", "module_name" => null, "type_category" => "Filter", "filter_category" => "General", "params" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],
        ["id" => 1001, "name" => "Areas", "display_name" => "Areas", "module_name" => null, "type_category" => "Filter", "filter_category" => "General", "params" => [
            ["id" => 1101, "name" => "K"],
            ["id" => 1102, "name" => "L"],
            ["id" => 1103, "name" => "M"],
            ["id" => 1104, "name" => "N"],
            ["id" => 1105, "name" => "P"],
            ["id" => 1106, "name" => "Q"],
            ["id" => 1107, "name" => "S"],
        ]],
        ["id" => 1002, "name" => "Media", "display_name" => "Media", "module_name" => null, "type_category" => "Filter", "filter_category" => "General", "params" => [
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
            ->get(['id', 'name', 'display_name', 'module_name', 'type_category', 'required', 'multiple', 'depends_on_id']);

            /*
        //get all partition columns and their possible valuesfor this module.
        $partitions = Partition::where('module', $moduleName)
            ->orderBy('column_name')->orderBy('order_column')
            ->get();
                */
        //format tags to fit $typesAndParams structure.
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["filter_category"] = $tagType->module_name === 'Tag' ? 'Period' : 'Module';
            $tagType["depends_on_column_name"] = null;
            $tagType["params"] = $params;
            unset($tagType->tags);
        }

        //format partitions to fit $typesAndParams structure.

        $partitionsFormatted = [];
        /*
        foreach ($partitions as $index => $part) {
            $key = array_search($part->column_name, array_column($partitionsFormatted, 'name'));

            if ($key === false) {
                $params = [];
                array_push($params, ['id' => $part->id,
                    'name' => $part->name,
                ]);
                array_push($partitionsFormatted, ['id' => $part->id,
                    'name' => $part->column_name,
                    'type_category' => 'Partition',
                    'required' => true,
                    'multiple' => false,
                    'display_name' => $part->display_name,
                    'params' => $params,
                ]);
            } else {
                //dd($partitionsFormatted[$key]["params"]);
                array_push($partitionsFormatted[$key]["params"], ['id' => $part->id,
                    'name' => $part->name,
                ]);
            }
        }
        */
        $typesAndParams = array_merge(self::$generalFilters, $tagTypes->toArray());

        //get item and media counts
        $itemCount = $fullModelName::count();
        $imageCount = \DB::table('media')->where('model_type', $moduleName)->count();

        return response()->json([
            "tagTypes" => $tagTypes,
            "partitions" => $partitionsFormatted,
            "typesAndParams" => $typesAndParams,
            "itemCount" => $itemCount,
            "imageCount" => $imageCount,
            "misc" => [],
        ], 200);

    }
}
