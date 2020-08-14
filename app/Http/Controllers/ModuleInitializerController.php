<?php

namespace App\Http\Controllers;

use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["id" => 1000, "category" => "general", "name" => "Seasons", "displayName" => "Seasons", "items" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],

        ["id" => 1001, "category" => "general", "name" => "Areas", "displayName" => "Areas", "items" => [
            ["id" => 1051, "name" => "K"],
            ["id" => 1052, "name" => "L"],
            ["id" => 1053, "name" => "M"],
            ["id" => 1054, "name" => "N"],
            ["id" => 1055, "name" => "P"],
            ["id" => 1056, "name" => "Q"],
            ["id" => 1057, "name" => "S"],
        ]],
        ["id" => 1002, "category" => "general", "name" => "Media", "displayName" => "Seasons", "items" => [
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
        $imageCount =  \DB::table('media')->where('model_type', $moduleName)->count();


        $itemTags = TagType::with('tags')->where('category', $moduleName)->orderBy('category')->orderBy('order_column')->get();
        $generalTags = TagType::with('tags')->where('category', 'general')->orderBy('category')->orderBy('order_column')->get();

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
