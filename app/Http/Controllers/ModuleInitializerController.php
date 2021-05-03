<?php

namespace App\Http\Controllers;

use App\JezStatic\WelcomePages;
use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $groups = [];
    private static $moduleName;
    private static $fullModuleName;
    private static $moduleHasTaggingSystem;

    private static $isFind;

    public function index(Request $request)
    {
        self::$isFind = false;
        self::$moduleHasTaggingSystem = true;

        switch ($request->input('moduleName')) {
            case "About":
            case "Area":
            case "Season":
                self::$moduleHasTaggingSystem = false;
                break;

            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
            case "Pottery":
            case "Flora":
            case "Fauna":
            case "Tbd":
                self::$isFind = true;
                break;
        }
        self::$moduleName = $request->input('moduleName');
        self::$fullModuleName = 'App\Models\Dig\\' . self::$moduleName;

        if (self::$moduleHasTaggingSystem) {
            self::addRegistration();
            self::addLookups();
            self::addPeriods();
            self::addTags();

            foreach (self::$groups as $key => $row) {
                $category_order[$key] = $row['category_order'];
                $group_order[$key] = $row['group_order'];
            }

            array_multisort($category_order, SORT_ASC, $group_order, SORT_ASC, self::$groups);

            //get rid of order columns
            foreach (self::$groups as $index => &$group) {
                unset($group["category_order"]);
                unset($group["group_order"]);
            }
        }

        //get counts
        $counts = [];
        $firstId = null;

        if (self::$moduleName !== 'About') {
            $counts['items'] = self::$fullModuleName::count();
            $counts['media'] = \DB::table('media')->where('model_type', self::$moduleName)->count();
            $firstRecord = self::$fullModuleName::first();
            $firstId = $firstRecord->id;
        }

        /*
        if (self::isFind) {
        $counts['baskets'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('basket_no')->whereNull('artifact_no')->count();
        $counts['artifacts'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('artifact_no')->whereNull('piece_no')->count();
        //$counts['pieces'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('piece_no')->count();
        }
         */

        $welcomeData = [];
        //$mapsBaseUrl = \Storage::disk('app-media')->url($fullMediaName);
        return response()->json([
            "groups" => self::$groups,
            "welcomeData" => [
                "counts" => $counts,
                "welcomePageParams" => WelcomePages::welcome(self::$moduleName),
                "firstId" => $firstId,
            ],

        ], 200);
    }

    private static function addRegistration()
    {
        $groups = [];
        array_push($groups, [
            "group_order" => 1,
            "name" => "Seasons",
            "display_name" => "Seasons",
            "params" => [
                ["id" => 1001, "name" => "2012"],
                ["id" => 1002, "name" => "2013"],
                ["id" => 1003, "name" => "2014"],
                ["id" => 1004, "name" => "2015"],
                ["id" => 1005, "name" => "2016"],
                ["id" => 1006, "name" => "2017"],
                ["id" => 1007, "name" => "2018"],
            ]]);

        array_push($groups, [
            "group_order" => 2,
            "name" => "Areas",
            "display_name" => "Areas",
            "params" => [
                ["id" => 1101, "name" => "K"],
                ["id" => 1102, "name" => "L"],
                ["id" => 1103, "name" => "M"],
                ["id" => 1104, "name" => "N"],
                ["id" => 1105, "name" => "P"],
                ["id" => 1106, "name" => "Q"],
                ["id" => 1107, "name" => "S"],
            ]]);

        array_push($groups, [
            "group_order" => 3,
            "name" => "Media",
            "display_name" => "Media",
            "params" => [
                ["id" => 1201, "name" => "Photo"],
                ["id" => 1202, "name" => "Drawing"],
                ["id" => 1203, "name" => "Plan"],

            ]]);

        if (self::$moduleName === "Pottery") {
            array_push($groups, [
                "group_order" => 4,
                "name" => "scopes",
                "display_name" => "Scopes",
                "params" => [
                    ["id" => "b", "name" => "Basket"],
                    ["id" => "a", "name" => "Artifact"],
                    ["id" => "p", "name" => "Piece"],
                ]]);
        }
        if (self::$isFind) {
            array_push($groups, [
                "group_order" => 5,
                "name" => "registration_categories",
                "display_name" => "Registration Categories",
                "params" => [
                    ["id" => 1, "name" => "PT"],
                    ["id" => 2, "name" => "GS"],
                    ["id" => 3, "name" => "FL"],
                    ["id" => 4, "name" => "LB"],
                    ["id" => 5, "name" => "AR"],
                ]]);
        }

        foreach ($groups as $index => $group) {
            $group["group_category"] = "Registration";
            $group["category_order"] = 1;
            $group["group_type"] = "Registration";
            array_push(self::$groups, $group);
        }
    }

    private static function addPeriods()
    {
        switch (self::$moduleName) {
            case "Pottery":
            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
                break;
            default:
                return;
        }

        $tagTypes = TagType::where('subject', 'Period')
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');}])
            ->get(['str_id', 'subject', 'category', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency']);

        //format tags to fit $typesAndParams structure.
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["group_type"] = 'Tag';
            $tagType["group_category"] = "Period";
            $tagType["dependency"] = json_decode($tagType->dependency);
            $tagType["params"] = $params;
            unset($tagType->tags);
            array_push(self::$groups, $tagType->toArray());
        }
    }

    private static function addLookups()
    {
        //change here if going to tag the Locus Module.
        if (!self::$isFind) {
            return;
        }

        $lookups = [];
        $order = [];
        switch (self::$moduleName) {
            case "Stone":
                $order = [3, 1];
                array_push($lookups, [
                    "table_name" => "stone_materials",
                    "column_name" => "material_id",
                    "display_name" => "Material",
                    "category_order" => 3,
                    "group_order" => 2]);

                array_push($lookups, [
                    "table_name" => "stone_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 5,
                    "group_order" => 1]);
                break;

            case "Lithic":
                $order = [3, 1];
                array_push($lookups, ["table_name" => "lithic_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 3,
                    "group_order" => 2]);
                break;

            case "Glass":
                $order = [3, 1];
                array_push($lookups, ["table_name" => "glass_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 4,
                    "group_order" => 1]);
                break;

            case "Metal":
                $order = [3, 1];
                array_push($lookups, ["table_name" => "metal_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 3,
                    "group_order" => 2]);
                break;

            case "Pottery":
                $order = [5, 1];
                array_push($lookups, [
                    "table_name" => "pottery_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Partition",
                    "category_order" => 11,
                    "group_order" => 1]);
                break;
        }

        //add preservation (common to all finds)
        array_push($lookups, [
            "table_name" => "preservations",
            "column_name" => "preservation_id",
            "display_name" => "Preservation",
            "category_order" => $order[0],
            "group_order" => $order[1]]);

        //access DB and format
        foreach ($lookups as $index => $lookup) {
            $params = \DB::table($lookup["table_name"])->get();

            array_push(self::$groups, [
                "group_type" => "Lookup",
                "group_category" => $lookup["column_name"] === "base_type_id" ? "Typology" : "Basic Characteristics",
                "category_order" => $lookup["category_order"],
                "group_order" => $lookup["group_order"],
                "column_name" => $lookup["column_name"],
                "display_name" => $lookup["display_name"],
                'params' => $params]);
        }

    }
    private static function addTags()
    {
        //not About, Area, Season
        $tagTypes = TagType::where('subject', self::$moduleName)
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');}])
            ->get(['str_id', 'subject', 'category', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency']);

        //format tags to fit $typesAndParams structure.
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagType["group_type"] = 'Tag';
            $tagType["group_category"] = $tagType->category;
            $tagType["dependency"] = json_decode($tagType->dependency);
            $tagType["params"] = $params;
            unset($tagType->tags);
            array_push(self::$groups, $tagType->toArray());
        }
    }
}
