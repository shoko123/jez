<?php

namespace App\Http\Controllers;

use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["id" => 1000, "category" => "general", "name" => "Seasons", "display_name" => "Seasons", "items" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],

        ["id" => 1001, "category" => "general", "name" => "Areas", "display_name" => "Areas", "items" => [
            ["id" => 1051, "name" => "K"],
            ["id" => 1052, "name" => "L"],
            ["id" => 1053, "name" => "M"],
            ["id" => 1054, "name" => "N"],
            ["id" => 1055, "name" => "P"],
            ["id" => 1056, "name" => "Q"],
            ["id" => 1057, "name" => "S"],
        ]],
        ["id" => 1002, "category" => "general", "name" => "Media", "display_name" => "Seasons", "items" => [
            ["id" => 1051, "name" => "photo"],
            ["id" => 1052, "name" => "drawing"],
            ["id" => 1053, "name" => "plan"],

        ]],
    ];

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');
        $fullModelName = 'App\Models\Dig\\' . $moduleName;

        $itemCount = $fullModelName::count();
        $imageCount = \DB::table('media')->where('model_type', $moduleName)->count();

        $itemTags = TagType::where('category', $moduleName)
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'tag_type_id');}])
            ->orderBy('order_column')
            ->get(['id', 'name', 'display_name', 'required', 'multiple', 'depends_on']);

        foreach ($itemTags as $index => $tagType) {
            $items = [];
            foreach ($tagType->tags as $index => $tag) {

                array_push($items, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["items"] = $items;
            unset($tagType->tags);
        }

        $generalTags = TagType::where('category', 'general')
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'tag_type_id');}])
            ->orderBy('order_column')
            ->get(['id', 'name', 'display_name', 'required', 'multiple', 'depends_on']);

        return response()->json([
            "itemTags" => $itemTags,
            "generalTags" => $generalTags,
            "generalFilters" => self::$generalFilters,
            "itemCount" => $itemCount,
            "imageCount" => $imageCount,
            "misc" => [],
        ], 200);

    }
}
